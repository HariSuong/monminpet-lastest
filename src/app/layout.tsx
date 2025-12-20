import type { Metadata } from 'next'
import './globals.css'
import { Roboto, Montserrat } from 'next/font/google'
import Header from '@/components/header'
import Footer from '@/components/footer'
import Providers from '@/lib/providers'
import AppProvider from './AppProvider'
import { cookies } from 'next/headers'
import { CartProvider } from '@/context/CartContext'
import { CouponProvider } from '@/context/coupon-context'
import { Toaster } from '@/components/ui/sonner'
import Script from 'next/script'
// import { Header } from '@/components/header-top'

const montserrat = Montserrat({
  subsets: ['vietnamese'],
  weight: ['300', '400', '500', '700']
})

export const metadata: Metadata = {
  title: {
    default: 'Monminpet - Gia đình - nơi có những người bạn bốn chân!',
    template: '%s | Monminpet'
  },
  description: 'Gia đình - nơi có những người bạn bốn chân!',
  // Thêm các link và icon vào đây
  icons: {
    icon: '/logo/fav-monminpet.png',
    apple: '/logo/fav-monminpet.png' // Cho apple-touch-icon
  },

  // 👇 BẠN THÊM VÀO ĐÂY NÈ 👇
  verification: {
    other: {
      // Dán mã bạn lấy từ Bing vào đây
      'msvalidate.01': '561FE92A3D68DB559FE0615112992DC8'
    }
  }
  // 👆 THÊM VÀO ĐÂY NÈ 👆
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookie = cookies()
  const sessionToken = cookie.get('sessionToken')?.value
  // console.log('sessionToken', sessionToken)
  const isLoggedIn = sessionToken !== undefined ? true : false
  const GA_TRACKING_ID = 'G-Y2VXBYW38T' // Mã Google Analytics của bạn

  return (
    <html lang='vi'>
      {/* <head>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        <link
          rel='icon'
          href='/logo/fav-monminpet.png'
          sizes='32x32'
          type='image/png'
        />
        <link rel='apple-touch-icon' href='/logo/fav-monminpet.png' />
      
     
      </head> */}
      {/* <body className={montserrat.className}> */}
      <body className={`w-full scroll-smooth ${montserrat.className}`}>
        <Providers>
          <CouponProvider>
            <CartProvider>
              {/* Bao bọc ứng dụng bằng CartProvider */}
              <Header isLoggedIn={isLoggedIn} />
              <AppProvider initialSessionToken={sessionToken}>
                {children}
                <Toaster position='top-right' richColors closeButton />
              </AppProvider>
              <Footer />
            </CartProvider>
          </CouponProvider>
        </Providers>

        {/* --- BẮT ĐẦU PHẦN GOOGLE ANALYTICS --- */}
        <Script
          strategy='afterInteractive'
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        />
        <Script id='google-analytics-config' strategy='afterInteractive'>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}');
          `}
        </Script>
        {/* --- KẾT THÚC PHẦN GOOGLE ANALYTICS --- */}
      </body>
    </html>
  )
}
