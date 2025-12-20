import Loading from '@/app/posts/loading'
import PostCat from '@/components/post/post-cat'
import postApiRequest from '@/services/apiPost'
import { Metadata } from 'next'
import { Suspense } from 'react'

// App router: force dynamic để mỗi lần request đều fresh
export const dynamic = 'force-dynamic'


export const metadata: Metadata = {
  title: 'Bài Viết',
  description:
    'Cập nhật các bài viết mới nhất về chăm sóc thú cưng, mẹo nuôi thú, dinh dưỡng và kiến thức thú y tại Monminpet.',
    // 👇 THÊM PHẦN NÀY VÀO 👇
  alternates: {
    canonical: 'https://monminpet.com/posts',
  },
  openGraph: {
    title: 'Bài Viết | Monminpet',
    description:
      'Cập nhật các bài viết mới nhất về chăm sóc thú cưng, mẹo nuôi thú, dinh dưỡng và kiến thức thú y tại Monminpet.',
    url: 'https://monminpet.com/posts',
    images: [
      {
        url: 'https://monminpet.com/logo/logo.png',
        width: 800,
        height: 600,
        alt: 'Monminpet Posts'
      }
    ],
    siteName: 'Monminpet'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bài Viết | Monminpet',
    description:
      'Cập nhật các bài viết mới nhất về chăm sóc thú cưng, mẹo nuôi thú, dinh dưỡng và kiến thức thú y tại Monminpet.',
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
      name: 'Bài Viết',
      item: 'https://monminpet.com/posts'
    }
  ]
}

const PostsHome = async () => {
  const { payload: postsCat } = await postApiRequest.getPostsCat()
  console.log('postsCat', postsCat)
  return (
    <Suspense fallback={<Loading />}>
      {/* 👇 THÊM SCRIPT SCHEMA VÀO ĐÂY 👇 */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <PostCat postsCat={postsCat.data} newPost={postsCat.new_post[0]} />
    </Suspense>
  )
}

export default PostsHome
