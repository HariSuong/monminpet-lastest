'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useCart } from '@/context/CartContext'
import { CouponCheckRequestType } from '@/schemaValidations/coupon.schema'
import React, { useState } from 'react'

import discountApiRequest from '@/services/apiInvoice'
import { toast } from 'sonner'
import { Toaster } from '@/components/ui/sonner'
import { useCoupon } from '@/context/coupon-context'

// interface Profile {
//   sessionToken: string
// }

const CouponForm: React.FC = () => {
  const { cart } = useCart()
  const { checkCoupon, loading } = useCoupon() // Lấy setCouponData từ context

  const [couponCode, setCouponCode] = useState('')

  const handleCouponCheck = async () => {
    const totalPrice = cart.reduce((acc, item) => acc + item.total, 0)

    checkCoupon(couponCode, totalPrice)
  }

  return (
    <>
      <div className='flex w-full items-center space-x-2 mt-4'>
        <Input
          value={couponCode}
          onChange={e => setCouponCode(e.target.value)}
          placeholder='Nhập mã giảm giá'
          className='focus-visible:ring-0 focus-visible:ring-inherit'
        />
        <Button onClick={handleCouponCheck} disabled={loading}> 
          {loading ? 'Đang kiểm tra...' : 'Áp dụng'}
        </Button>
      </div>
      <Toaster position='top-right' richColors closeButton />
    </>
  )
}

export default CouponForm
