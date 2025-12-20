'use client'
import React from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Video from './video'

interface BannerProps {
  type?: 'video'
  url: string
  position?: string
  to?: string
  time?: number
}

const Banner: React.FC<BannerProps> = ({
  type,
  url,
  position = '',
  to,
  time = 100
}) => {
  const searchParams = useSearchParams()
  const catId = Number(searchParams.get('catId'))

  const image = to ? (
    <Link href={to}>
      <div className='max-w-full mx-auto text-center relative z-10'>
        <div className='relative w-full h-0 pb-[56.25%] cursor-pointer'>
          <Image src={url} alt='Banner Image' fill className='object-cover' />
        </div>
        {position === 'product' && (
          <div className='absolute right-0 bottom-12'>
            <p className='bg-orange-100 px-10 py-4 font-semibold text-lg rounded-s-full text-center'>
              <Link href={`/products/`}>
                Tất cả <br /> DANH MỤC ở<br /> đây nè
              </Link>
            </p>
            {/* <p className='bg-orange-100 px-10 py-4 font-semibold text-lg rounded-s-full text-center'>
              {catId === 1 && (
                <Link href={`/products/danh-cho-sep-meo?catId=2&page=1`}>
                  Đồ của <br /> SẾP MÈO ở<br /> đây nè
                </Link>
              )}
              {catId === 2 && (
                <Link href={`/products/danh-cho-sep-cun?catId=1&page=1`}>
                  Đồ của <br /> SẾP CÚN ở<br /> đây nè
                </Link>
              )}
            </p> */}
          </div>
        )}
      </div>
    </Link>
  ) : (
    <div className='max-w-full mx-auto text-center relative z-10'>
      <div className='relative cursor-pointer'>
        {catId === 1 ? (
          <Image src={url} alt='Banner Image' width={1440} height={527} />
        ) : (
          <Image
            src={url}
            alt='Banner Image'
            width={1440}
            height={527}
            className='w-full h-full object-cover'
          />
        )}
      </div>
      {position === 'product' && (
        <div className='absolute right-0 bottom-12'>
          <p className='bg-orange-100 px-10 py-4 font-semibold text-lg rounded-s-full text-center'>
            {catId === 1 && (
              <Link href={`/products/danh-cho-sep-meo?catId=2&page=1`}>
                Đồ của <br /> SẾP MÈO ở<br /> đây nè
              </Link>
            )}
            {catId === 2 && (
              <Link href={`/products/danh-cho-sep-cun?catId=1&page=1`}>
                Đồ của <br /> SẾP CÚN ở<br /> đây nè
              </Link>
            )}
          </p>
        </div>
      )}
    </div>
  )

  const content = type === 'video' ? <Video url={url} time={time} /> : image

  return content
}

export default Banner
