import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Title from '../title'

const PetCat: React.FC = () => {
  return (
    <div className='p-4 relative'>
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

      <div className='md:p-8 p-4 flex items-center gap-y-6 md:flex-row flex-col justify-center mx-auto z-10 gap-x-6 xl:gap-x-72 md:gap-x-12 lg:pt-20 pt-10'>
        <Link
          href='/products/?catId=1'
          className='flex flex-col gap-4 items-center'>
          <h3 className='uppercase font-semibold text-lg'>Dành cho sếp cún</h3>
          <Image
            src='/icon/dog.png'
            alt='Icon Dog'
            width={300}
            height={300}
            className='w-40 h-w-40 md:w-52 lg:w-72 lg:h-72 md:h-52'
          />
        </Link>

        <Link
          href='/products/?catId=2'
          className='flex flex-col gap-4 items-center'>
          <h3 className='uppercase font-semibold text-lg'>Dành cho sếp mèo</h3>
          <Image
            src='/icon/cat.png'
            alt='Icon Cat'
            width={300}
            height={300}
            className='w-40 h-w-40 md:w-52 lg:w-72 lg:h-72 md:h-52'
          />
        </Link>
      </div>
      <div className='xl:ml-40 ml-0'>
        <Title title='sản phẩm cho boss' subtitle='all product' />
      </div>
    </div>
  )
}

export default PetCat
