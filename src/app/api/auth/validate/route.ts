import { NextResponse } from 'next/server'
import http from '@/lib/http'
interface ValidateResponse {
  valid: boolean
}
export async function GET() {
  try {
    // Gọi đến backend để validate token
    const response = await http.get<ValidateResponse>('/auth/validate', {
      baseUrl: process.env.NEXT_PUBLIC_API_URL
    })

    return NextResponse.json({ valid: response.payload.valid })
  } catch (error) {
    return NextResponse.json({ valid: false }, { status: 401 })
  }
}
