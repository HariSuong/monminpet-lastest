import OrderSummary from '@/app/checkout/_component/order-summary'

import CheckoutAccordion from '@/app/checkout/_component/checkout-accordion'
import accountApiRequest from '@/services/apiAccount'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { Suspense } from 'react'
import Loading from '@/app/loading'
// app/cart/page.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Thanh toán',
  robots: {
    index: false,
    follow: false, // Google không cần đi theo các link trong trang này
  },
};
const CheckoutPage = async () => {
  const cookieStore = cookies()
  const sessionToken = cookieStore.get('sessionToken')

  if (!sessionToken?.value)
    return (
      <div className='md:min-h-screen h-full bg-gray-50 px-4 sm:px-6 py-24 md:pt-32 md:pb-16 lg:py-40'>
        <p>
          Bạn chưa là thành viên.{' '}
          <Link className='underline text-amber-700' href='/login'>
            Đăng ký
          </Link>{' '}
          trở thành thành viên ngay để tiếp tục thanh toán đơn hàng
        </p>
        <p>
          Nếu đã là thành viên, vui lòng
          <Link className='underline text-amber-700' href='/login'>
            {' '}
            đăng nhập ngay
          </Link>{' '}
          để tiếp tục thao tác mua hàng
        </p>
      </div>
    )

  // Gọi API lấy thông tin tài khoản
  const result = await accountApiRequest.me(sessionToken.value)

  if (!result) return <p>Không tìm được tài khoản cá nhân</p>

  return (
    <Suspense fallback={<Loading />}>  
      <div className='md:min-h-screen h-full bg-gray-50 px-4 sm:px-6 py-24 md:pt-32 md:pb-16 lg:py-40'>
        <div className='max-w-7xl mx-auto'>
          <div className='flex lg:flex-row flex-col-reverse gap-8'>
            {/* Left Column */}
            <div className='bg-white p-6 rounded-lg shadow lg:w-2/3 w-full'>
              <CheckoutAccordion profile={result.payload?.data} />
            </div>

            {/* Right Column */}
            <div className='bg-white p-6 rounded-lg shadow lg:w-1/3 w-full'>
              <h2 className='text-2xl font-bold mb-6'>Đơn hàng của bạn</h2>

              <OrderSummary />
            </div>
          </div>
        </div>
      </div>
    </Suspense>  
  )
}

export default CheckoutPage
