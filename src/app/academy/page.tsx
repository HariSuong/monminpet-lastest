import Image from 'next/image'
import React from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Giáo dục',
  description:
    'Khám phá câu chuyện của Monminpet – nơi tình yêu dành cho thú cưng trở thành sứ mệnh.',
  openGraph: {
    title: 'Giáo dục',
    description:
      'Khám phá câu chuyện của Monminpet – nơi tình yêu dành cho thú cưng trở thành sứ mệnh.',
    url: 'https://monminpet.com/about-us',
    siteName: 'Monminpet',
    images: [
      {
        url: 'https://monminpet.com/logo/logo.png',
        width: 800,
        height: 600,
        alt: 'Monminpet Logo'
      }
    ],
    locale: 'vi_VN',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Giáo dục | Monminpet',
    description:
      'Khám phá câu chuyện của Monminpet – nơi tình yêu dành cho thú cưng trở thành sứ mệnh.',
    images: ['https://monminpet.com/logo/logo.png']
  }
}
const Academy = () => {
  return (
    <div>
      {/*  Ở đay chưa có nội dung nên chỉ để một cái hình coming soon bao phủ toàn bộ web luôn, hình để ở academy/coming-soon.png */}
      <Image
        src='/academy/coming-soon.png'
        alt='Coming Soon'
        width={1000}
        height={2000}
        className='w-full h-full object-cover'
      />

      {/* <div
        className='w-full h-full bg-cover bg-center'
        style={{ backgroundImage: 'url(/academy/coming-soon.png)' }}></div> */}
    </div>
  )
}

export default Academy
