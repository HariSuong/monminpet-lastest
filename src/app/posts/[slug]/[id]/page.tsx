// posts/[slug]/[id]/page.tsx

import Loading from '@/app/loading'

import PostDetail from '@/components/post/post-detail'
import postApiRequest from '@/services/apiPost'
import { Metadata } from 'next'
import { Suspense } from 'react'
import slugify from 'slugify'

export async function generateMetadata({
  params
}: {
  params: { slug:string,id: string }
}): Promise<Metadata> {
  const { id, slug } = params

  const canonicalUrl = `https://monminpet.com/posts/${slug}/${id}`;
  const post = await postApiRequest.getDetail(Number(id));



  return {
    title: post.payload.data.title,
    description: post.payload.data.desc,
    // 👇 THÊM PHẦN NÀY VÀO 👇
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${post.payload.data?.title} | Monminpet`,
      description: post.payload.data.desc,
      images: post.payload.data.thumb, // Cập nhật hình ảnh đại diện cho danh mục
      url: canonicalUrl,
      type: 'article'
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.payload.data?.title} | Monminpet`,
      description: ` ${post.payload.data?.desc}`,
      images: post.payload.data?.thumb
    }
  }
}

const PostDetailPage = async ({ params }: { params: { id: string ,slug:string} }) => {
  const { id ,slug} = params

  try {
    // Trả về dữ liệu sản phẩm từ API
    const { payload } = await postApiRequest.getDetail(Number(id))

    // Kiểm tra nếu không có dữ liệu
    if (!payload?.data) {
      return <p>Không tìm thấy sản phẩm</p>
    }

    const post = payload.data // Gán dữ liệu bài viết vào biến

    // 👇 ĐỊNH NGHĨA SCHEMA BÀI VIẾT 👇
    const articleSchema = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `https://monminpet.com/posts/${slug}/${id}`
      },
      headline: post.title,
      description: post.desc,
      image: [post.thumb],
      author: {
        '@type': 'Organization', // Hoặc Person nếu bạn có tác giả cụ thể
        name: 'Monminpet'
      },
      publisher: {
        '@type': 'Organization',
        name: 'Monminpet',
        logo: {
          '@type': 'ImageObject',
          url: 'https://monminpet.com/logo/logo.png'
        }
      },
      datePublished: post.created_at, // Đảm bảo có 'created_at' từ API
      // dateModified: post.updated_at || post.created_at // Đảm bảo có 'updated_at' từ API
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
          name: 'Bài Viết', // Hoặc tên danh mục cha nếu có
          item: 'https://monminpet.com/posts'
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: post.title, // Tên bài viết
          item: `https://monminpet.com/posts/${slug}/${id}`
        }
      ]
    }

    return (
      <Suspense fallback={<Loading />}>

        {/* 👇 THÊM 2 SCRIPT SCHEMA VÀO ĐÂY 👇 */}
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        <PostDetail payload={payload} />
      </Suspense>
    )
  } catch (error) {
    console.error('error', error)
    // Xử lý lỗi nếu có
    return <p>Đã có lỗi xảy ra khi tải dữ liệu sản phẩm</p>
  }
}

export default PostDetailPage
