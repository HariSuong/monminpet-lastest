import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Title from '../title'
import LeftToRightAnimation from '@/components/common/left-to-right'
import RightToLeftAnimation from '@/components/common/right-to-left'
import slugify from 'slugify'

interface ProductCat {
  id: number
  name: string
  thumb: string
  inside: number
}

const PetCats = ({ cats }: { cats: ProductCat[] }) => {
  if (!cats) return null
  return (
    <div className='p-4 relative xl:px-[4.5rem] container'>
      <div className='block lg:hidden'>
        <Image
          src='/icon/iconmeo.png'
          alt='Icon Mèo'
          className='absolute bottom-0 lg:-bottom-4 right-0 w-1/4 z-0'
          width={200}
          height={100}
        />
        <Image
          src='/icon/iconhoa.png'
          alt='Icon Hoa'
          className='absolute top-0 left-0 w-1/4 z-0'
          width={200}
          height={200}
        />
      </div>

      <div className='md:py-8 py-4 hidden lg:flex justify-center items-center'>
        <LeftToRightAnimation
          className='md:py-8 py-4 flex justify-center items-center lg:gap-12 md:gap-2 w-full mb-4 md:mb-0'
          delay={0.2}>
          {cats.slice(0, 2).map(cat => {
            return (
              <div
                className='py-4 flex items-center w-full md:w-auto justify-center'
                key={cat.id}>
                <Link
                  href={`/products/${slugify(cat.name || '', {
                    lower: true,
                    strict: true,
                    locale: 'vi'
                  })}?catId=${cat.id}`}
                  className='flex flex-col items-center justify-center'>
                  <h3 className='uppercase font-semibold xl:text-2xl lg:text-xl md:text-lg text-xs mb-4'>
                    {cat.name}
                  </h3>
                  {/* <Image
                    src={cat.thumb || '/icon/cat.png'}
                    alt={`Icon ${cat.name}`}
                    width={300}
                    height={300}
                    className='transition-transform duration-300 ease-in-out transform hover:scale-105 cursor-pointer w-36 h-36 lg:w-60 lg:h-60'
                  /> */}
                  <img
                    src={cat.thumb || '/icon/cat.png'}
                    alt={`Icon ${cat.name}`}
                    className='transition-transform duration-300 ease-in-out transform hover:scale-105 cursor-pointer w-36 h-36 lg:w-60 lg:h-60'
                  />
                </Link>
              </div>
            )
          })}
        </LeftToRightAnimation>

        <RightToLeftAnimation
          className='md:py-8 py-4 flex justify-center items-center lg:gap-12 md:gap-2 w-full mb-4 md:mb-0'
          delay={0.2}>
          {cats.slice(2, 4).map(cat => {
            return (
              <div
                className='py-4 flex items-center w-full md:w-auto justify-center'
                key={cat.id}>
                <Link
                  href={`/products/${slugify(cat.name || '', {
                    lower: true,
                    strict: true,
                    locale: 'vi'
                  })}?catId=${cat.id}`}
                  className='flex flex-col items-center justify-center'>
                  <h3 className='uppercase font-semibold xl:text-2xl lg:text-xl md:text-lg text-xs mb-4'>
                    {cat.name}
                  </h3>
                  {/* <Image
                    src={cat.thumb || '/icon/dog.png'}
                    alt={`Icon ${cat.name}`}
                    width={300}
                    height={300}
                    className='w-36 h-36 lg:w-60 lg:h-60'
                  /> */}
                  <img
                    src={cat.thumb || '/icon/dog.png'}
                    alt={`Icon ${cat.name}`}
                    className='w-36 h-36 lg:w-60 lg:h-60'
                  />
                </Link>
              </div>
            )
          })}
        </RightToLeftAnimation>
      </div>

      <div className='md:p-8 py-4 flex lg:hidden flex-col justify-center items-center'>
        <div className='md:p-8 py-4 flex justify-center items-center md:gap-16 lg:gap-0 w-full mb-4 md:mb-0'>
          {cats.slice(0, 2).map(cat => {
            return (
              <div
                className='py-4 flex items-center md:gap-8 gap-2 w-full md:w-auto justify-center'
                key={cat.id}>
                <Link
                  href={`/products/${slugify(cat.name || '', {
                    lower: true,
                    strict: true,
                    locale: 'vi'
                  })}?catId=${cat.id}`}
                  className='flex flex-col items-center justify-center'>
                  <h3 className='uppercase font-semibold xl:text-2xl lg:text-xl md:text-lg text-xs mb-4'>
                    {cat.name}
                  </h3>
                  <Image
                    src={cat.thumb || '/icon/cat.png'}
                    alt={`Icon ${cat.name}`}
                    width={300}
                    height={300}
                    className='w-36 h-36 lg:w-60 lg:h-60'
                  />
                </Link>
              </div>
            )
          })}
        </div>

        <div className='md:p-8 p-0 flex justify-center items-center md:gap-16 lg:gap-0 w-full'>
          {cats.slice(2, 4).map(cat => {
            return (
              <div
                className='py-4 flex items-center md:gap-8 gap-2 w-full md:w-auto justify-center'
                key={cat.id}>
                <Link
                  href={`/products/${slugify(cat.name || '', {
                    lower: true,
                    strict: true,
                    locale: 'vi'
                  })}?catId=${cat.id}`}
                  className='flex flex-col items-center justify-center'>
                  <h3 className='uppercase font-semibold xl:text-2xl lg:text-xl md:text-lg text-xs mb-4'>
                    {cat.name}
                  </h3>
                  <Image
                    src={cat.thumb || '/icon/dog.png'}
                    alt={`Icon ${cat.name}`}
                    width={300}
                    height={300}
                    className='w-36 h-36 lg:w-60 lg:h-60'
                  />
                </Link>
              </div>
            )
          })}
        </div>
      </div>
      <div className=''>
        <Title title='sản phẩm cho boss' subtitle='all product' />
      </div>
    </div>
  )
}

export default PetCats
