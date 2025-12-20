'use client'

import { useCart } from '@/context/CartContext'
import { useCoupon } from '@/context/coupon-context'
import Link from 'next/link'
import React, { useEffect } from 'react'

const OrderSummary = () => {
  const { cart, getPaymentInfo } = useCart()
  const { discount, reachedPrice, clearCoupon } = useCoupon()

  const totalPrice = cart.reduce((acc, item) => acc + item.total, 0)
  const shippingFee = totalPrice <= 1000000 ? 30000 : 0

  const discountedPrice =
    totalPrice > reachedPrice ? Math.max(totalPrice - discount, 0) : null

  const finalPrice = discountedPrice
    ? discountedPrice + shippingFee
    : totalPrice + shippingFee

  useEffect(() => {
    if (discount > 0 && totalPrice < reachedPrice) {
      clearCoupon()
    }
  }, [totalPrice, reachedPrice, discount, clearCoupon])

  // console.log(discount, finalPrice)

  return (
    <div>
      <div className='space-y-4'>
        {cart.map(product => (
          <div
            key={product.id}
            className='flex justify-between items-center gap-1 border-b pb-4'>
            <div>
              <h3 className='font-medium'>{product.name}</h3>

              <p className='text-gray-500'>
                {product.attributes.length > 0 ? (
                  <>
                    (
                    {/* <span>Size: {product?.attributes[1]?.name}</span> {' | '} */}
                    <span>Phân loại: {product?.attributes[0]?.name}</span>){' '}
                    {' x '}
                    <span>{product.quantity}</span>
                  </>
                ) : (
                  <span>x{product.quantity}</span>
                )}
              </p>
            </div>
            <p className='font-medium'>
              {product.total.toLocaleString('vi-VN', {
                currency: 'VND'
              })}
              đ
            </p>
          </div>
        ))}
        <div className='text-right'>
          <Link href={'/cart'} className='underline text-gray-600'>
            Chỉnh sửa đơn hàng
          </Link>
        </div>

        <div className='pt-4'>
          <div className='flex justify-between mb-2'>
            <p className='text-gray-600'>Tổng tiền hàng</p>
            <p className='font-medium'>
              {totalPrice.toLocaleString('vi-VN', {
                currency: 'VND'
              })}
              đ
            </p>
          </div>
          <div className='flex justify-between mb-2'>
            <p className='text-gray-600'>Phí vận chuyển</p>
            <p className='font-medium'>
              {shippingFee.toLocaleString('vi-VN', {
                currency: 'VND'
              })}
              đ
            </p>
          </div>
          <div className='flex justify-between mb-2'>
            <p className='text-gray-600'>Ưu đãi</p>
            <p className='font-medium'>
              {discount.toLocaleString('vi-VN', {
                currency: 'VND'
              })}
              đ
            </p>
          </div>
          <div className='flex justify-between pt-4 border-t'>
            <p className='font-bold'>Tổng cộng</p>
            <p className='font-bold'>
              {(finalPrice
                ? finalPrice + shippingFee
                : totalPrice + shippingFee
              ).toLocaleString('vi-VN', {
                currency: 'VND'
              })}
              đ
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderSummary
