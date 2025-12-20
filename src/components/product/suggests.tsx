import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import slugify from 'slugify'
import { formatPrice } from '@/components/product/product-item'

interface SuggestsProps {
  image: string
  name: string
  price: number
  id: number
}

const Suggests: React.FC<SuggestsProps> = ({ image, name, price, id }) => {
  return (
    <div className='flex items-center bg-[#F8EDD8] pe-2 mb-3 '>
      <div className='w-20'>
        <Image
          src={image}
          width={80}
          height={80}
          alt='thumbnail'
          className='w-20 h-20 bg-white'
        />
      </div>
      <div className='ml-4 flex-1'>
        <p className='text-sm italic font-extralight'>
          <Link
            href={`/products/${slugify(name || '', {
              lower: true,
              strict: true,
              locale: 'vi'
            })}/${id}`}>
            {name}
          </Link>
        </p>
        <div className='flex gap-1'>
          <p className='text-base font-bold'>
            {formatPrice(Number(price))}
            <sup>đ</sup>
          </p>
          {/* <p className='text-base font-bold italic'> - Thêm vào giỏ hàng</p> */}
        </div>
      </div>
    </div>
  )
}

export default Suggests
