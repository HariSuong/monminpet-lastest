import React from 'react'
import Badge from '../badge'
import Link from 'next/link'
import Image from 'next/image'
import slugify from 'slugify'
import CountdownHome from '@/components/home/countdown'

export const formatPrice = (price: number) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

const ProductItem = ({
  id,
  name,
  description,
  price,
  priceOld,
  imageUrl,
  countdownTimer,
  isNew,
  isHot,
  onClick
}: {
  id: number
  name: string
  description?: string
  price: number
  priceOld: number
  imageUrl: string
  countdownTimer?: number
  isNew?: number
  isHot?: number
  onClick?: () => void // 👈 kiểu hàm không bắt buộc
}) => {
  return (
    <Link
      href={`/products/${slugify(name || '', {
        lower: true,
        strict: true,
        locale: 'vi'
      })}/${id}`}
      onClick={onClick}>
      <div className='bg-white rounded-2xl p-5 cursor-pointer hover:-translate-y-2 transition-all relative'>
        <div className='lg:w-11/12 w-full lg:h-[210px] h-36 overflow-hidden mx-auto md:mb-2 mb-4'>
          <img
            src={imageUrl || '/logo/logo.png'}
            alt={name}
            className='h-full w-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-105'
          />
          {/* <Image
            src={imageUrl || '/logo/logo.png'}
            alt={name}
            width={300}
            height={300}
            className='h-full w-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-105'
          /> */}
          {isNew && <Badge title='NEW!' />}
          {isHot && <Badge title='HOT!' />}
        </div>
        <div className='text-center'>
          <h3 className='md:text-xl text-base md:font-bold font-medium uppercase text-gray-800 line-clamp-2 mt-6'>
            {name}
          </h3>
          {description && (
            <p className='text-sm mt-2 line-clamp-3'>{description}</p>
          )}
          <div className='flex gap-2 justify-center items-center mt-4'>
            <h4 className='text-xl text-gray-800 font-bold'>
              {formatPrice(price)}
              <sup>đ</sup>
            </h4>
            {priceOld > 0 && (
              <p className='text-[#A9829C] text-xl line-through'>
                {priceOld?.toLocaleString('vi-VN', {
                  style: 'currency',
                  currency: 'VND'
                })}
              </p>
            )}
          </div>
          {countdownTimer && <CountdownHome timer={countdownTimer} />}
        </div>{' '}
      </div>
    </Link>
  )
}

export default ProductItem
