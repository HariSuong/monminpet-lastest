// posts/[slug]/page.tsx

import Loading from '@/app/posts/loading'
import Pagination from '@/components/pagination'
import PostList from '@/components/post/post-list'
import postApiRequest from '@/services/apiPost'
import { Suspense } from 'react'

import { Metadata } from 'next'

export const dynamic = 'force-dynamic'



export async function generateMetadata({
  params,
  searchParams
}: {
  params: { slug: string },
  searchParams: { catId?: string; page?: string; q?: string }
}): Promise<Metadata> {
  const { slug } = params;
  const { catId, page, q } = searchParams;
  
  // Lấy dữ liệu từ API
  const posts = await postApiRequest.getPosts(Number(catId) || 1, Number(page) || 1, q || '');

  // // Xây dựng URL chính tắc một cách an toàn và linh hoạt
  // const queryParams = new URLSearchParams();
  // if (catId) queryParams.set('catId', catId);
  // if (page) queryParams.set('page', page);
  // if (q) queryParams.set('q', q);

  // const queryString = queryParams.toString();
  // const canonicalUrl = `https://monminpet.com/posts/${params.slug}${queryString ? `?${queryString}` : ''}`;
  
  const title = q ? `Tìm kiếm cho: "${q}"` : posts.payload.menu?.name;
  const description = q ? `Kết quả tìm kiếm cho từ khóa "${q}"` : posts.payload.menu?.desc;
  // 1. Nếu có tham số tìm kiếm 'q', không index trang này
    if (q) {
      return {
        title: `Kết quả tìm kiếm cho "${q}"`,
        robots: {
          index: false,
          follow: true, // Cho phép Google đi theo các link trên trang này
        },
      };
    }

    // 2. Xây dựng URL chính tắc (canonical) chỉ với các tham số cần thiết
    const canonicalUrl = new URL(`https://monminpet.com/posts/${slug}`);
    if (catId) {
      canonicalUrl.searchParams.set('catId', catId);
    }
    if (page && Number(page) > 1) { // Chỉ thêm page nếu nó lớn hơn 1
      canonicalUrl.searchParams.set('page', page);
    }

  return {
     title,
    description,

     // 👇 THÊM PHẦN NÀY VÀO 👇
    alternates: {
      canonical: canonicalUrl,
    },
     // Nếu có tham số tìm kiếm 'q', yêu cầu Google không index trang này
    ...(q && {
      robots: {
        index: false,
        follow: true,
      },
    }),
    openGraph: {
      title: `${title} | Monminpet`,
      description,
      images:
        posts.payload.menu?.thumb || 'https://monminpet.com/logo/logo.png', // Cập nhật hình ảnh đại diện cho danh mục
      url:canonicalUrl.toString(),
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title: `Danh mục sản phẩm ${posts.payload.menu?.name} | Monminpet`,
      description: `Khám phá các sản phẩm chất lượng của Monminpet trong danh mục ${posts.payload.menu?.name}.`,
      images: posts.payload.menu?.thumb || 'https://monminpet.com/logo/logo.png'
    }
  }
}

const CategoryPostPage = async ({
  params,
  searchParams
}: {
  params: { slug: string },
  searchParams: { catId?: string; page?: string; q?: string }
}) => {
  const catId = Number(searchParams.catId) || 1
  const page = Number(searchParams.page) || 1

  const q = searchParams.q || ''

  const posts = await postApiRequest.getPosts(catId, page, q)

  const { links, last_page, data } = posts.payload.data

  // console.log('posts', posts.payload.data.data)

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
        name: 'Bài Viết',
        item: 'https://monminpet.com/posts'
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: posts.payload.menu?.name, // Tên danh mục
        item: `https://monminpet.com/posts/${params.slug}?catId=${catId}`
      }
    ]
  }

  return (
    <Suspense fallback={<Loading />}>
      <div className='bg-gray-100 md:mb-12 mb-6 py-24 md:pt-32 md:pb-16 lg:py-40'>
        <div className='p-4 mx-auto lg:max-w-7xl sm:max-w-full'>
          {/* <ProductList products={data} /> */}
          <PostList posts={data} />
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

export default CategoryPostPage
