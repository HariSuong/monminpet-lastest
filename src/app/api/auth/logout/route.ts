//src/app/api/auth/logout/route.ts
/*import { HttpError } from '@/lib/http'
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
*/

import authApiRequest from '@/services/apiAuth'
import { cookies } from 'next/headers'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST() {
  const cookieStore = cookies()
  const sessionToken = cookieStore.get('sessionToken')?.value

  // ✅ 1) Logout phía Next trước: xoá cookie ngay lập tức
  cookieStore.delete('sessionToken')

  // ✅ 2) Gọi backend Laravel để revoke token (nếu có) nhưng KHÔNG để nó làm fail
  if (sessionToken) {
    try {
      // Tăng timeout cho logout (tuỳ bạn), và/hoặc để default cũng được
      await authApiRequest.logoutFrNextServerToServer(sessionToken)
    } catch (e) {
      // Nuốt lỗi: user vẫn đã logout ở phía Next
      // Có thể log nhẹ nếu muốn:
      // console.error('Logout backend failed:', e)
    }
  }

  return Response.json({ message: 'Logout thành công' }, { status: 200 })
}
