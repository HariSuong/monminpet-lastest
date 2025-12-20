// app/accounts/update/route.ts
import accountApiRequest from '@/services/apiAccount'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function PUT(request: NextRequest) {
  try {
    // Lấy dữ liệu cập nhật từ body
    const body = await request.json()
    const sessionToken = cookies().get('sessionToken')?.value

    // const sessionToken = body.sessionToken as string
    // console.log('sessionToken route', sessionToken, 'body', body)
    if (!sessionToken) {
      return Response.json(
        { message: 'Không nhận được session token' },
        { status: 400 }
      )
    }

    // Gọi API update thông tin người dùng
    const result = await accountApiRequest.updateAccount(body, sessionToken)

    return NextResponse.json({
      message: 'Profile updated successfully',
      data: result.payload
    })
  } catch (error) {
    console.error('Error updating profile:', error)
    return NextResponse.json(
      { message: 'Failed to update profile' },
      { status: 500 }
    )
  }
}
