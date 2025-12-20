'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'

import { Coupon } from '@/types/products'

const ProductCoupon = ({ coupons }: { coupons: Coupon[] }) => {
  const [copied, setCopied] = useState(false)
  // console.log('coupons', coupons)
  if (!coupons) return null

  // Hàm xử lý copy mã giảm giá
  const handleCopy = (couponCode: string) => {
    navigator.clipboard.writeText(couponCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000) // Reset sao chép sau 2 giây
  }

  return (
    <div className='flex items-center mb-5 space-x-3'>
      <span className='md:text-xl text-lg md:font-semibold font-medium md:w-[30%] w-2/5'>
        Mã giảm giá
      </span>
      <div className='flex items-center gap-6 md:w-[70%] w-3/5 flex-wrap'>
        {coupons.map(coupon => (
          <div className='relative' key={coupon.code}>
            <Dialog>
              <DialogTrigger asChild>
                {/* <div className='relative cursor-pointer'>
                  <Image
                    width={127}
                    height={50}
                    src='/icon/badge-coupon.png'
                    alt='badge-coupon'
                    className='w-full object-cover'
                  />
                  <span className='absolute bottom-0 top-0 left-0 right-0 h-full w-full font-medium text-center text-white pointer-events-none flex items-center justify-center'>
                    {coupon.code}
                  </span>
                </div> */}
                <div className='relative w-auto px-4 h-[50px] bg-blue-300 text-white text-center flex items-center justify-center rounded-md cursor-pointer'>
                  <span className='absolute top-[14px] left-[-8px] w-5 h-5 bg-blue-300 rounded-full transform rotate-[-10deg]'></span>
                  <span className='absolute top-[14px] right-[-8px] w-5 h-5 bg-blue-300 rounded-full transform rotate-[-10deg]'></span>
                  {coupon.code}
                </div>
              </DialogTrigger>

              <DialogContent className='p-6 bg-white rounded-xl shadow-xl'>
                <DialogHeader className='text-center'>
                  <DialogTitle className='text-xl font-semibold'>
                    Thông tin mã giảm giá
                  </DialogTitle>
                </DialogHeader>

                <div className='flex items-center border border-gray-300'>
                  {/* Logo bên trái */}
                  <div className='relative w-[104px] h-24 p-2 border-r border-dashed border-gray-300 flex items-center justify-center'>
                    <Image
                      src='/logo/logo.png'
                      alt='Logo'
                      width={100}
                      height={100}
                      className='w-full h-full object-contain'
                    />

                    {/* Những dấu chấm tròn nhỏ bên góc trên và dưới */}
                    <div className='absolute top-[-12px] left-[calc(100%-7.5px)] w-3.5 h-3.5 bg-white border-2 border-transparent border-t-gray-300 border-b-gray-300 border-l-gray-300 rounded-full transform rotate-90'></div>
                    <div className='absolute bottom-[-12px] left-[calc(100%-7.5px)] w-3.5 h-3.5 bg-white border-2 border-transparent border-t-gray-300 border-b-gray-300 border-l-gray-300 rounded-full transform rotate-[-95deg]'></div>
                  </div>

                  {/* Nội dung mã giảm giá bên phải */}
                  <div className='flex flex-col justify-between h-24 w-full px-1'>
                    <div>
                      <h3>Mã Giảm Giá: {coupon.code}</h3>
                      <p className='text-sm text-gray-500'>{coupon.text}</p>
                    </div>
                    <div className='flex justify-between items-end mb-4'>
                      <p className='text-xs text-gray-500 italic'>
                        Hạn sử dụng: {coupon.exp_time}
                      </p>
                      <Button
                        variant='outline'
                        onClick={() => handleCopy(coupon.code)}
                        className={`px-4 py-2 ${
                          copied ? 'bg-green-300' : 'bg-blue-300'
                        } text-white rounded-md`}>
                        {copied ? 'Copied' : 'Copy'}
                      </Button>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductCoupon
