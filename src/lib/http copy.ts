import envConfig from '@/config'
import { LoginResType } from '@/schemaValidations/auth.schema'
import authApiRequest from '@/services/apiAuth'

type CustomOptions = Omit<RequestInit, 'method'> & {
  baseUrl?: string | undefined
}

export class HttpError extends Error {
  status: number
  payload: {
    message: string
    [key: string]: any
  }
  constructor({ status, payload }: { status: number; payload: any }) {
    super(payload.message || `HTTP Error: ${status}`)
    this.status = status
    this.payload = payload
  }
}

class SessionTokenClient {
  private token = ''

  get value() {
    return this.token
  }

  set value(token: string) {
    // Nếu gọi method này ở server thì sẽ bị lỗi
    if (typeof window === 'undefined') {
      throw new Error('Không thể thiết lập token trên server side')
    }
    this.token = token
  }
}

export const sessionTokenClient = new SessionTokenClient()

const request = async <Response>(
  url: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  options?: CustomOptions | undefined,
  //xử lý timeout cho request
  timeout = 10000 // 10s
) => {
  //Dùng AbortController để hủy request sau một khoảng thời gian nhất định
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeout)

  const body = options?.body ? JSON.stringify(options.body) : undefined

  const baseHeaders = {
    'Content-Type': 'application/json',
    Authorization: sessionTokenClient.value
      ? `Bearer ${sessionTokenClient.value}`
      : ''
  }

  // Nếu không truyền baseUrl, tức baseUrl = undefined thì lấy từ envConfig.NEXT_PUBLIC_API_URL
  // Nếu truyền baseUrl thì lấy giá trị truyền vào, truyền '' đồng nghĩa với việc chúng ta gọi API tới Nextjs server

  const baseUrl =
    options?.baseUrl === undefined
      ? envConfig.NEXT_PUBLIC_API_URL
      : options.baseUrl

  const fullUrl = url.startsWith('/') ? `${baseUrl}${url}` : `${baseUrl}/${url}`

  // console.log('Request Option:', options)
  // console.log('Request URL:', fullUrl)
  // console.log('Request Body:', body)

  try {
    const response = await fetch(fullUrl, {
      ...options,
      method,
      headers: {
        ...baseHeaders,
        ...options?.headers
      },
      body,
      signal: controller.signal // Gán signal cho fetch
    })
    clearTimeout(timeoutId) // Xóa timeout nếu request thành công

    // Thêm phần kiểm tra lỗi 401
    if (response.status === 401) {
      const redirectUrl = `/login?redirect=${encodeURIComponent(
        window.location.pathname
      )}`

      // Chỉ xử lý trên client
      if (typeof window !== 'undefined') {
        await authApiRequest.logoutFrClientToNextServer()
        window.location.href = redirectUrl
        return {} as any // Dừng xử lý tiếp
      }

      // Nếu ở server-side (SSR)
      throw new HttpError({
        status: 401,
        payload: { message: 'Phiên đăng nhập đã hết hạn', redirectUrl }
      })
    }

    const payload: Response = await response.json()
    const data = {
      status: response.status,
      payload
    }
    // console.log('Dữ liệu ', data)

    if (!response.ok) {
      throw new HttpError(data)
    }

    // Set sessionToken cho login và register và đảm bảo logic dưới đây chỉ chạy phía client (browser)
    if (typeof window !== 'undefined') {
      if (['/login', '/register'].includes(url)) {
        sessionTokenClient.value = (payload as LoginResType).token
      } else if (['/logout'].includes(url)) {
        sessionTokenClient.value = ''
      }
    }

    return data
  } catch (error: any) {
    clearTimeout(timeoutId)
    if (error.name === 'AbortError') {
      throw new Error('Request timeout')
    }
    throw error
  }
}

const http = {
  get: <Response>(
    url: string,
    options?: Omit<CustomOptions, 'body'> | undefined
  ) => request<Response>(url, 'GET', options),
  post: <Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, 'body'> | undefined
  ) => request<Response>(url, 'POST', { ...options, body }),

  put: <Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, 'body'> | undefined
  ) => request<Response>(url, 'PUT', { ...options, body }),

  delete: <Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, 'body'> | undefined
  ) => request<Response>(url, 'DELETE', { ...options, body })
}

export default http
