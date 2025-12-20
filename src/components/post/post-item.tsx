import React from 'react'
import Badge from '../badge'
import Link from 'next/link'
import Image from 'next/image'
import slugify from 'slugify'

interface PostItem {
  id: number
  title: string
  desc: string
  thumb: string
  count_view?: number
  slide?: boolean
}

const PostItem = (props: PostItem) => {
  const { id, desc, thumb, title, slide = false } = props

  return (
    <div className='bg-white rounded-2xl cursor-pointer hover:-translate-y-2 transition-all relative'>
      <Link
        href={`/posts/${slugify(title || '', {
          lower: true,
          strict: true,
          locale: 'vi'
        })}/${id}`}>
        <div className='w-full md:h-80 h-40 overflow-hidden mx-auto md:mb-2 mb-4'>
          <Image
            src={thumb || ''}
            alt={title}
            width={300}
            height={400}
            className='h-full w-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-105'
          />
        </div>
      </Link>

      <div className={`${slide ? 'p-0 mt-6' : 'p-5'}`}>
        <Link
          href={`/posts/${slugify(title || '', {
            lower: true,
            strict: true,
            locale: 'vi'
          })}/${id}`}>
          <h3 className='md:text-2xl text-lg font-bold uppercase text-gray-800 line-clamp-2'>
            {title}
          </h3>
          {desc && (
            <p className='text-sm mt-2 font-light line-clamp-3'>{desc}</p>
          )}
        </Link>
      </div>
    </div>
  )
}

export default PostItem
