// products/[slug]/page.tsx

import Loading from '@/app/products/loading'
import Banner from '@/components/banner'
import Pagination from '@/components/pagination'
import ProductFilter from '@/components/product/product-filter'
import ProductList from '@/components/product/product-list'
import productApiRequest from '@/services/apiProducts'
import { Metadata } from 'next'
import { Suspense } from 'react'

export async function generateMetadata({
  params,
  searchParams
}: {
  params: { slug: string },
  searchParams: { catId?: string; page?: string; orderBy?: string }
}): Promise<Metadata> {
  const { slug } = params;
  const { catId, page, orderBy } = searchParams;

  // Gọi API mà không có 'q'
  const products = await productApiRequest.getProducts(
    Number(catId) || 1, 
    Number(page) || 1, 
    orderBy || ''
  );

   // 2. Lấy title và description từ dữ liệu API
  const title = products.payload.menu?.name || 'Sản phẩm Monminpet';
  const description = products.payload.menu?.desc || 'Khám phá các sản phẩm chất lượng của Monminpet.';
  
  // 3.  Xây dựng URL chính tắc (canonical) mà KHÔNG chứa 'orderBy'
  const canonicalUrl = new URL(`https://monminpet.com/products/${slug}`);
  if (catId) {
    canonicalUrl.searchParams.set('catId', catId);
  }
  if (page && Number(page) > 1) {
    canonicalUrl.searchParams.set('page', page);
  }


  return {
     title,
    description,
    
    // 4. Thêm thẻ canonical
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${title} | Monminpet`,
      description,
      images: products.payload.menu?.thumb, // Cập nhật hình ảnh đại diện cho danh mục
      url:canonicalUrl,
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title: `Danh mục sản phẩm ${products.payload.menu?.name} | Monminpet`,
      description: `Khám phá các sản phẩm chất lượng của Monminpet trong danh mục ${products.payload.menu?.name}.`,
      images: products.payload.menu?.thumb
    }
  }
}

const CategoryPage = async ({
  params,
  searchParams
}: {
  params: { slug: string },
  searchParams: { catId?: string; page?: string; orderBy?: string }
}) => {
  const catId = Number(searchParams.catId) || 1
  const page = Number(searchParams.page) || 1
  const orderBy = searchParams.orderBy || ''

  const products = await productApiRequest.getProducts(catId, page, orderBy)
  const { links, last_page, data } = products.payload.data
  // console.log('data', products)


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
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: products.payload.menu?.name, // Tên danh mục
        item: `https://monminpet.com/products/${params.slug}?catId=${catId}`
      }
    ]
  }

  return (
    <Suspense fallback={<Loading />}>
      {/* 👇 THÊM SCRIPT SCHEMA VÀO ĐÂY 👇 */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Banner url={products.payload.menu?.thumb || ''} />
      <div className='bg-gray-100'>
        <div className='flex justify-end py-10 md:pr-10 pr-4'>
          <ProductFilter />
        </div>
        <div className='p-4 mx-auto lg:max-w-7xl sm:max-w-full'>
          <ProductList products={data} />
          <Pagination
            pageInfo={{
              current_page: Number(searchParams.page) || 1,
              links,
              last_page
            }}
            searchParams={searchParams}
          />
        </div>
      </div>
    </Suspense>
  )
}

export default CategoryPage
