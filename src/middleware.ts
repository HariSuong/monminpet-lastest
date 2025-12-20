import envConfig from '@/config'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const privatePaths = [
  '/account',
  '/profile',
  '/purchase-history',
  '/review',
  '/checkout'
]
const authPaths = ['/login', '/register', '/password-reset']

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const sessionToken = request.cookies.get('sessionToken')

  const isPrivate = privatePaths.some(
    path => pathname === path || pathname.startsWith(`${path}/`)
  )

  const isAuth = authPaths.some(
    path => pathname === path || pathname.startsWith(`${path}/`)
  )
  console.log('sessionToken', sessionToken)
  // Thêm logic validate token với backend
  if (isPrivate && sessionToken) {
    try {
      // Gọi API backend validate token đúng url từ biến môi trường
      const validateUrl = `${envConfig.NEXT_PUBLIC_API_URL}/auth/validate`
      console.log('validateUrl', validateUrl)
      const validateResponse = await fetch(validateUrl, {
        headers: {
          Authorization: `Bearer ${sessionToken.value}`,
          'Content-Type': 'application/json'
        },
        cache: 'no-store'
      })

      // Check HTTP status
      if (!validateResponse.ok) {
        throw new Error(`HTTP error! status: ${validateResponse.status}`)
      }

      // Check response body
      const data = await validateResponse.json()
      if (!data.valid) {
        throw new Error('Invalid token in response')
      }
    } catch (error) {
      const redirectUrl = new URL('/login', request.url)
      redirectUrl.searchParams.set('redirect', pathname)

      const response = NextResponse.redirect(redirectUrl)
      response.cookies.delete('sessionToken')

      return response
    }
  }

  // Nếu là trang riêng tư mà chưa có token => chuyển hướng đến login + redirect về trang cũ
  if (isPrivate && !sessionToken) {
    const redirectUrl = new URL('/login', request.url)
    redirectUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // Nếu là trang login/register mà đã có token => chuyển về trang chủ
  if (isAuth && sessionToken) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  // matcher: [...privatePath, ...authPath]
  matcher: [
    '/account',
    '/profile',
    '/purchase-history',
    '/review',
    '/login',
    '/register',
    '/password-reset',
    '/checkout'
  ]
}
