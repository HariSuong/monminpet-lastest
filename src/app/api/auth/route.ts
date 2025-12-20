import { cookies } from 'next/headers'

export async function POST(request: Request) {
  try {
    const res = await request.json()
    const sessionToken = res.sessionToken as string

    if (!sessionToken) {
      return Response.json(
        { message: 'Không nhận được session token' },
        { status: 400 }
      )
    }

    // Thiết lập cookie với thuộc tính bảo mật
    cookies().set({
      name: 'sessionToken',
      value: sessionToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Chỉ bật Secure ở production
      sameSite: 'strict', // Ngăn chặn CSRF
      path: '/',
      maxAge: 60 * 60 * 24 * 30 // 30 ngày đồng bộ với backend
    })

    // Thiết lập header CORS
    const headers = new Headers()
    headers.set('Access-Control-Allow-Origin', '*') // Cho phép tất cả các origin (hoặc thay bằng domain cụ thể)
    headers.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS') // Phương thức HTTP cho phép
    headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization') // Các headers cho phép

    return Response.json(
      { message: 'Lưu session token thành công' },
      { status: 200, headers }
    )
  } catch (error) {
    return Response.json({ message: 'Lỗi server' }, { status: 500 })
  }
}
