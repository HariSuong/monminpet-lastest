import { HttpError } from '@/lib/http'
import authApiRequest from '@/services/apiAuth'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  const cookieStore = cookies()
  const sessionToken = cookieStore.get('sessionToken')

  if (!sessionToken) {
    return Response.json(
      { message: 'Không nhận được session token' },
      { status: 400 }
    )
  }

  try {
    // console.log('sessionToken.value', sessionToken.value)
    const result = await authApiRequest.logoutFrNextServerToServer(
      sessionToken.value
    )

    // Xóa cookie `sessionToken`
    cookies().delete('sessionToken')

    return Response.json(
      { message: 'Logout thành công', data: result },
      { status: 200 }
    )
  } catch (error) {
    console.error('Lỗi khi logout:', error)

    if (error instanceof HttpError) {
      return Response.json(error.payload, {
        status: error.status
      })
    } else {
      return Response.json({ message: 'Lỗi không xác định' }, { status: 500 })
    }
  }
}
