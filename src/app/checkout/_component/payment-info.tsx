'use client'
import ButtonSubmit from '@/app/(auth)/_component/button-submit'
import { Button } from '@/components/ui/button'
import { Toaster } from '@/components/ui/sonner'
import { useRouter } from 'next/navigation'
import { useCart } from '@/context/CartContext'

import React, { useEffect, useState } from 'react'
import { FaCreditCard, FaMoneyBill, FaQrcode } from 'react-icons/fa'
import { toast } from 'sonner'
import Image from 'next/image'
import accountApiRequest from '@/services/apiAccount'
import { useCoupon } from '@/context/coupon-context'

const PaymentInfo = ({
  codePayment,
  amount,
  orderId
}: {
  codePayment: string
  amount: number
  orderId?: number
}) => {
  const router = useRouter()
  const { clearCart } = useCart()
  const { clearCoupon } = useCoupon()
  const [copied, setCopied] = useState(false)

  // Hàm xử lý copy mã giảm giá
  const handleCopy = (couponCode: string) => {
    navigator.clipboard.writeText(couponCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000) // Reset sao chép sau 2 giây
  }

  

  console.log('orderId', orderId)

  // Hàm kiểm tra trạng thái thanh toán
  const checkPaymentStatus = React.useCallback(async () => {
    if (!orderId) return false
    try {
      const result = await accountApiRequest.invoice(orderId)
      console.log('result.payload.data.paid', result.payload.data.paid)
      return result.payload.data.paid === 1
    } catch (error) {
      return false
    }
  }, [orderId])

  useEffect(() => {
    if (!orderId) return

    const paymentPolling = setInterval(async () => {
      const isPaid = await checkPaymentStatus()
      console.log('isPaid', isPaid)
      if (isPaid) {
        clearInterval(paymentPolling)
        toast.success('Thanh toán thành công', {
          description: 'Đơn hàng của bạn đã được xử lý thành công'
        })
        clearCoupon()
        clearCart()
        router.push(`/account/purchase-history/${orderId}?tab=purchase-history`)
      }
    }, 3000) // Kiểm tra mỗi 3 giây

    return () => clearInterval(paymentPolling)
  }, [orderId, checkPaymentStatus, clearCoupon, clearCart, router]) // Chạy lại effect khi orderId thay đổi

  return (
    <div className='space-y-6'>
      <div className='flex gap-4'>
        <div
          className={`flex-1 py-3 px-4 rounded-lg flex items-center bg-blue-600 text-white gap-2`}>
          <FaCreditCard />
          Chuyển khoản ngân hàng
        </div>
      </div>

      <div className='bg-gray-50 p-4 rounded-lg flex flex-col items-center justify-center'>
        <h3 className='text-xl font-semibold mb-4'>Thông tin chuyển khoản</h3>
        <div className='space-y-2 text-center'>
          <p>Tên ngân hàng: Ngân hàng VPBank</p>
          <p>Số tài khoản: 3123685</p>
          <p>Chủ tài khoản: Lê Minh Duy</p>
          <p> Lời nhắn chuyển khoản: </p>{' '}
          <div className='flex justify-between md:justify-center md:gap-4 items-center mb-4'>
            <p className='font-bold md:text-3xl'>MMP{codePayment}</p>
            <Button
              variant='outline'
              onClick={() => handleCopy(`MMP${codePayment}`)}
              className={`px-4 py-2 ${
                copied ? 'bg-green-300' : 'bg-blue-300'
              } text-white rounded-md`}>
              {copied ? 'Copied' : 'Copy'}
            </Button>
          </div>
          <p className='text-sm bg-orange-200 p-2 rounded-md'>
            Vui lòng nhập đúng thông tin chuyển khoản để tránh mất thời gian xử
            lý
          </p>
          <p className='font-bold'>
            Hoặc quét mã bên dưới để được nhập thông tin tự động
          </p>
          <div className='mt-4'>
            <Image
              src={`https://api.vietqr.io/image/970432-3123685-JrUfq5m.jpg?accountName=LE%20MINH%20DUY&amount=${amount}&addInfo=MMP${codePayment}`}
              alt='Mã QR'
              width={500}
              height={500}
            />
          </div>
        </div>

        {/* <ButtonSubmit title='Xác nhận thanh toán' onClick={handlePayment} /> */}
      </div>
      <Toaster position='top-right' richColors closeButton />
    </div>
  )
}

export default PaymentInfo
