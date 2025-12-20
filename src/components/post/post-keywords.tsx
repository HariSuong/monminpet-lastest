// components/post/post-keywords.tsx
'use client'

import React from 'react'
import Link from 'next/link'
import slugify from 'slugify'

const PostKeywords = ({ keywords, id }: { keywords: string[]; id: number }) => {
  if (!keywords || keywords.length === 0) return null

  return (
    <div className='mt-10'>
      <h2 className='text-gray-900 md:text-2xl text-lg title-font font-medium mb-4 md:mt-12 mt-10  uppercase'>
        Từ khóa liên quan
      </h2>
      <div className='flex flex-wrap gap-2'>
        {keywords.map((keyword, index) => (
          <Link
            key={index}
            href={`/posts/${slugify(keyword.trim() || '', {
              lower: true,
              strict: true,
              locale: 'vi'
            })}/?catId=${id}&page=1&q=${keyword.trim()}`}
            className='px-3 py-1 bg-gray-200 text-sm text-gray-700 rounded-full hover:bg-gray-300 transition'>
            #{keyword.trim()}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default PostKeywords
