import Point from '@/app/(account)/_component/benefit/point'
import ProductGift from '@/app/(account)/_component/benefit/product-gift'
import accountApiRequest from '@/services/apiAccount'
import { cookies } from 'next/headers'
import React from 'react'

const Benefit = async () => {
  const cookieStore = cookies()
  const sessionToken = cookieStore.get('sessionToken')

  if (!sessionToken?.value) return <div>Chưa đăng nhập</div>

  // Gọi API lấy thông tin tài khoản
  const result = await accountApiRequest.gift(sessionToken.value)
  // console.log('result', result)
  if (!result) return
  // console.log('result', result)
  return (
    <div>
      <Point
        point={result.payload.data.totalBalance}
        message={result.payload.message}
      />

      <ProductGift products={result.payload} />
    </div>
  )
}

export default Benefit
