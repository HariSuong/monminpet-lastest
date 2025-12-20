// services/page.tsx

import Loading from '@/app/services/loading'
import Banner from '@/components/banner'
import ContactForm from '@/components/contact-form'
import BannerScroll from '@/components/services/banner-scroll'
import ServicesList from '@/components/services/services-list'
import serviceApiRequest from '@/services/apiServices'
import { Metadata } from 'next'
import { Suspense } from 'react'

 
export const metadata: Metadata = {
  title: 'Dịch Vụ',
  description:
    'Tận hưởng các dịch vụ chăm sóc thú cưng chuyên nghiệp tại Monminpet: Tư vấn thú y, huấn luyện, bảo hiểm thú cưng và nhiều hơn thế nữa.',
  openGraph: {
    title: 'Dịch Vụ | Monminpet',
    description:
      'Tận hưởng các dịch vụ chăm sóc thú cưng chuyên nghiệp tại Monminpet: Tư vấn thú y, huấn luyện, bảo hiểm thú cưng và nhiều hơn thế nữa.',
    url: 'https://monminpet.com/services',
    images: [
      {
        url: 'https://monminpet.com/logo/logo.png',
        width: 800,
        height: 600,
        alt: 'Monminpet Services'
      }
    ],
    siteName: 'Monminpet'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dịch Vụ | Monminpet',
    description:
      'Tận hưởng các dịch vụ chăm sóc thú cưng chuyên nghiệp tại Monminpet.',
    images: ['https://monminpet.com/logo/logo.png']
  }
}

const ServicesPage = async () => {
  const services = await serviceApiRequest.getServices()

  // console.log('services', services.payload.menus)

  return (
    <Suspense fallback={<Loading />}>
      <Banner type='video' url='/services/banner-no-logo.mp4' />
      <BannerScroll linkUrl='/services/vetcoach.png' />
      <ServicesList services={services.payload.menus} />
      <Banner url='/services/bao-hiem-thu-cung.png' to='/pet-insurance' />
      <ContactForm services={services.payload.menus} />
    </Suspense>
  )
}

export default ServicesPage
