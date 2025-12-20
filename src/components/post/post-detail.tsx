// 'use client'
import { BreadcrumbWithCustomSeparator } from '@/components/breadcrumb-with-custom-separator'
import PostKeywords from '@/components/post/post-keywords'
import PostList from '@/components/post/post-list'
import type { PostDetail, PostDetailRes } from '@/types/posts'

import Image from 'next/image'
import slugify from 'slugify'

const PostDetail = ({ payload }: { payload: PostDetailRes }) => {
  // Tạo đối tượng Date từ chuỗi ISO
  const date = new Date(payload.data.created_at)

  // Lấy ngày, tháng, năm
  // const day = String(date.getDate()).padStart(2, '0')
  // const month = String(date.getMonth() + 1).padStart(2, '0') // tháng từ 0-11 nên +1
  // const year = date.getFullYear()

  // // Hiển thị theo format dd/mm/yyyy
  // const formattedDate = `Ngày đăng: ${day}/${month}/${year}`
  console.log('payload', payload)

  return (
    <div className='container mx-auto py-24 md:pt-32 md:pb-16 lg:py-40'>
      <BreadcrumbWithCustomSeparator
        parentLink={`/posts/${slugify(payload?.data.menus.name || '', {
          lower: true,
          strict: true,
          locale: 'vi'
        })}?catId=${payload.data.menus.id}&page=1`}
        corePage='Bài viết'
        coreLink='/posts'
        currentPage={payload.data.title}
        parentPage={payload?.data.menus.name}
      />
      <div className='w-full flex flex-col justify-center items-center px-0 md:container lg:px-0'>
        <div className='lg:w-2/3 w-full'>
          <h1 className='text-gray-900 md:text-3xl text-lg title-font md:font-bold font-medium mb-1 uppercase md:leading-10'>
            {payload.data.title}
          </h1>
          {/* Thêm lượt xem với ngày đăng */}
          <div className='text-gray-500 text-sm font-light mb-4 italic'>
            <span>
              {new Date(payload.data.created_at).toLocaleDateString('vi-VN', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
              })}
            </span>
            <span className='mx-2'>| {payload.data.count_view} lượt xem</span>
          </div>
          {/* <img src={payload.data.thumb} className='w-full my-4' /> */}

          <Image
            width={800}
            height={627}
            src={payload.data.thumb}
            alt={payload.data.title}
            className='rounded my-8 object-cover w-full h-2/3'
          />
          <blockquote className='mt-6 border-l-2 pl-6 pr-2 py-2 text-sm italic bg-stone-100 text-gray-500 my-4'>
            {payload.data.desc}
          </blockquote>
          <div
            className='content-container'
            dangerouslySetInnerHTML={{ __html: payload.data.content }}
          />
        </div>
      </div>
      <div className='px-0 md:container lg:px-0'>
        {(payload?.data?.related).length > 0 && (
          <>
            <h2 className='text-gray-900 md:text-2xl text-lg title-font font-medium mb-4 md:mt-12 mt-10  uppercase'>
              Các tin liên quan
            </h2>
            <PostList posts={payload.data?.related} />
          </>
        )}

        <PostKeywords
          keywords={payload.data.keywords}
          id={payload.data.menus.id}
        />
      </div>
    </div>
  )
}

export default PostDetail
