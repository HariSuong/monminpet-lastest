import { ServicesCat } from '@/types/services'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const ServiceItem: React.FC<ServicesCat> = ({ id, name, thumb, content }) => {
  return (
    <div
      className={`flex w-full overflow-hidden items-center${
        id % 2 !== 0 ? ' flex-row-reverse' : ''
      }`}>
      <div className='w-1/2 flex flex-col justify-center items-start bg-white lg:px-24 px-10'>
        <div className='transition-transform transform translate-x-0 delay-500 duration-1000'>
          <h1 className='text-base md:text-2xl lg:text-4xl font-bold mb-4'>
            {name.toUpperCase()}
          </h1>
        </div>
        <div className='transition-transform transform translate-y-0 delay-700 duration-1000 leading-10'>
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
        <div className='flex justify-center items-center'>
          <Link
            href={`/services/${id}`}
            className='px-4 py-2 bg-[#F8EDD8] italic font-semibold text-lg'>
            ĐỌC THÊM
          </Link>
        </div>
      </div>
      <div className='w-1/2 relative'>
        <Image
          src={thumb}
          alt={name}
          width={300}
          height={300}
          className='h-full w-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-105'
        />
      </div>
    </div>
  )
}

export default ServiceItem
