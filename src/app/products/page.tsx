// products/page.tsx

import Loading from '@/app/products/loading'
import Banner from '@/components/banner'
import ProductCat from '@/components/product/product-cat'
import ProductVideoService from '@/components/product/product-video-service'
import productApiRequest from '@/services/apiProducts'
import { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Sản Phẩm',
  description:
    'Khám phá các sản phẩm chăm sóc thú cưng chất lượng cao tại Monminpet. An toàn, tự nhiên và được chọn lọc kỹ lưỡng để nâng cao sức khỏe thú cưng của bạn.',
    // 👇 THÊM PHẦN NÀY VÀO 👇
  alternates: {
    canonical: 'https://monminpet.com/products',
  },
  openGraph: {
    title: 'Sản Phẩm | Monminpet',
    description:
      'Khám phá các sản phẩm chăm sóc thú cưng chất lượng cao tại Monminpet. An toàn, tự nhiên và được chọn lọc kỹ lưỡng để nâng cao sức khỏe thú cưng của bạn.',
    url: 'https://monminpet.com/products',
    images: [
      {
        url: 'https://monminpet.com/logo/logo.png',
        width: 800,
        height: 600,
        alt: 'Monminpet Products'
      }
    ],
    siteName: 'Monminpet'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sản Phẩm | Monminpet',
    description:
      'Khám phá các sản phẩm chăm sóc thú cưng chất lượng cao tại Monminpet.',
    images: ['https://monminpet.com/logo/logo.png']
  }
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
      name: 'Sản Phẩm',
      item: 'https://monminpet.com/products'
    }
  ]
}

const ProductsHome = async () => {
  const { payload: productsCat } = await productApiRequest.getProductsCat()

  return (
    <Suspense fallback={<Loading />}>
      {/* 👇 THÊM SCRIPT SCHEMA VÀO ĐÂY 👇 */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />


      <Banner type='video' url='/product/banner.mp4' />

      <ProductCat productsCat={productsCat.data} />
      <ProductVideoService />
      <Banner type='video' url='/product/services-prodct.mp4' time={3000} />
    </Suspense>
  )
}

export default ProductsHome
