// services/[slug]/[id]/page.tsx

import Loading from '@/app/loading'
import Banner from '@/components/banner'
import { BreadcrumbWithCustomSeparator } from '@/components/breadcrumb-with-custom-separator'
import ContactForm from '@/components/contact-form'
import { Faq } from '@/components/faq'
import ServiceContent from '@/components/services/service-content'
import ServiceTitle from '@/components/services/service-title'
import serviceApiRequest from '@/services/apiServices'
import { Metadata } from 'next'
import { Suspense } from 'react'
import slugify from 'slugify'

export async function generateMetadata({
  params
}: {
  params: { id: string, slug: string }
}): Promise<Metadata> {
  const { id,slug } = params

  const service = await serviceApiRequest.getDetailService(Number(id))
// const slug = slugify(service.payload.data.name || '', { /* ... options */ });
  const canonicalUrl = `https://monminpet.com/services/${slug}/${service.payload.data.id}`; 
  return {
    title: service.payload.data.name,
    description: service.payload.data.desc,
    alternates: {
      canonical: canonicalUrl, // <--- THÊM THẺ CANONICAL VÀO ĐÂY
    },

    openGraph: {
      title: `${service.payload.data?.name} | Monminpet`,
      description: service.payload.data.desc,
      images: service.payload.data.thumb, // Cập nhật hình ảnh đại diện cho danh mục
      url:canonicalUrl,
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title: `${service.payload.data?.name} | Monminpet`,
      description: ` ${service.payload.data?.desc}`,
      images: service.payload.data?.thumb
    }
  }
}

const ServiceDetailPage = async ({ params }: {params: { id: string, slug: string } }) => {
  const { id, slug } = params
  const service = await serviceApiRequest.getDetailService(Number(id))
  const services = await serviceApiRequest.getServices()

  // 👇 ĐỊNH NGHĨA SCHEMA DỊCH VỤ 👇
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.desc,
    image: service.thumb,
    url: `https://monminpet.com/services/${slug}/${id}`,
    provider: { // Thông tin người cung cấp dịch vụ
      '@type': 'Organization',
      name: 'Monminpet',
      url: 'https://monminpet.com/'
    }
    // Nếu dịch vụ có giá cụ thể, bạn có thể thêm 'offers'
  }

  // 👇 ĐỊNH NGHĨA SCHEMA ĐƯỜNG DẪN 👇
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Trang chủ',
        item: 'https://monminpet.com/'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Dịch Vụ',
        item: 'https://monminpet.com/services'
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: service.name, // Tên dịch vụ
        item: `https://monminpet.com/services/${slug}/${id}`
      }
    ]
  }
  // console.log('service', service.payload.data.content)
  return (
    <Suspense fallback={<Loading />}>
      {/* 👇 THÊM 2 SCRIPT SCHEMA VÀO ĐÂY 👇 */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className='md:py-36 py-8'>
        <div className='container my-10'>
          <div className='lg:w-4/5 mx-auto'>
            <BreadcrumbWithCustomSeparator
              corePage='Dịch vụ'
              coreLink={`/services`}
              currentPage={service.payload.data?.name || ''}
            />
            <ServiceTitle title={service.payload.data?.name} />

            <ServiceContent service={service.payload.data} />
          </div>
        </div>
        <Banner url='/services/quy-trinh-monminpet.png' />
        <div className='w-full mx-auto mt-10 container'>
          <div className='lg:w-4/5 mx-auto my-8 flex flex-wrap'>
            <Faq faqs={service.payload.data.faqs} />
          </div>
          <ContactForm services={services.payload.menus} />
        </div>
      </div>
    </Suspense>
  )
}

export default ServiceDetailPage
