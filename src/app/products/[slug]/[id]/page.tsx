// products/[slug]/[id]/page.tsx

import Loading from '@/app/loading'

import ProductDetail from '@/components/product/product-detail'
import productApiRequest from '@/services/apiProducts'
import { Metadata } from 'next'
import { cookies } from 'next/headers'
import { Suspense } from 'react'

export async function generateMetadata({
  params
}: {
  params: {  slug:string, id: string }
}): Promise<Metadata> {
  const { id ,slug} = params
const canonicalUrl = `https://monminpet.com/products/${slug}/${id}`;
  const products = await productApiRequest.getDetail(Number(id), '')

  return {
    title: products.payload.data.name,
    description: products.payload.data.desc,


    // 👇 THÊM PHẦN NÀY VÀO 👇
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: products.payload.data.name,
      description:
        products.payload.data.desc ||
        `Mô tả cho sản phẩm ${products.payload.data.name}`,
      images: products.payload.data.thumb, // Cập nhật hình ảnh đại diện cho danh mục
      url:canonicalUrl
    },
    twitter: {
      card: 'summary_large_image',
      title: products.payload.data.name,
      description:
        products.payload.data?.desc ||
        `Mô tả cho sản phẩm ${products.payload.data.name}`,
      images: products.payload.data.thumb
    }
  }
}

const ProductPage = async ({ params }: { params: {  slug:string, id: string }}) => {
  const cookieStore = cookies()
  const sessionToken = cookieStore.get('sessionToken')
  const { id ,slug} = params

  // if (!sessionToken?.value) return <div>Chưa đăng nhập</div>

  try {
    // Trả về dữ liệu sản phẩm từ API
    const { payload } = await productApiRequest.getDetail(
      Number(id),
      sessionToken?.value || ''
    )

    // Kiểm tra nếu không có dữ liệu
    if (!payload?.data) {
      return <p>Không tìm thấy sản phẩm</p>
    }


    const product = payload.data // Gán dữ liệu sản phẩm vào biến

    // 👇 ĐỊNH NGHĨA SCHEMA SẢN PHẨM 👇
    const productSchema = {
      '@context': 'https://schema.org/',
      '@type': 'Product',
      name: product.name,
      image: [product.thumb], // Thêm các ảnh khác nếu có
      description: product.desc,
      sku: product.sku || product.id, // Dùng SKU nếu có, nếu không dùng tạm ID
      offers: {
        '@type': 'Offer',
        url: `https://monminpet.com/products/${slug}/${id}`,
        priceCurrency: 'VND',
        price: product.price, // Đảm bảo 'product.price' có tồn tại và là SỐ
        availability: product.stock > 0 // Giả sử bạn có trường này
          ? 'https://schema.org/InStock'
          : 'https://schema.org/OutOfStock'
      }
      // Nếu bạn có đánh giá sản phẩm, hãy thêm aggregateRating
      // "aggregateRating": {
      //   "@type": "AggregateRating",
      //   "ratingValue": product.averageRating || "4.5", // ví dụ
      //   "reviewCount": product.reviewCount || "1" // ví dụ
      // }
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
          name: 'Sản Phẩm', // Hoặc tên danh mục cha nếu có
          item: 'https://monminpet.com/products'
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: product.name, // Tên sản phẩm
          item: `https://monminpet.com/products/${slug}/${id}`
        }
      ]
    }
    
    return (
      <Suspense fallback={<Loading />}>
        {/* 👇 THÊM 2 SCRIPT SCHEMA VÀO ĐÂY 👇 */}
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        />
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        <ProductDetail product={payload.data} />
      </Suspense>
    )
  } catch (error) {
    console.error('error', error)
    // Xử lý lỗi nếu có
    return <p>Đã có lỗi xảy ra khi tải dữ liệu sản phẩm</p>
  }
}

export default ProductPage
