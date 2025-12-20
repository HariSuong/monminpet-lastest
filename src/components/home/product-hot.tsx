import React from 'react'

import Title from '../title'
import SlideFeedback from '../slide-feedback'
import Image from 'next/image'
import homeApiRequest from '@/services/apiHome'
import ProductSlider from '@/components/product/product-slider'
import ProductSliderHome from '@/components/home/product-slider-home'
import TopToBotAnimation from '@/components/common/top-to-bot'

const ProductHot = async ({ products }: { products: ProductHome[] }) => {
  // const home = await homeApiRequest.getHome
  // const home = await fetch('https://cdn.monminpet.com/public/api/home')
  // console.log('home', await home.json())

  const product =
    products.length > 0 ? (
      <div className='md:my-40 my-16 relative lg:px-[4.5rem] lg:container'>
        <Image
          src='/icon/iconquote.png'
          width={48}
          height={48}
          className='w-8 md:w-12 absolute md:-top-10 md:left-14 left-7 -top-8'
          alt='Icon Quote'
        />
        <div className='container lg:px-0 md:block hidden'>
          <Title title='Flash sale' subtitle='khuyến mãi hot còn' />
        </div>
        <div className='container flex items-center justify-between md:hidden sm:px-6 md:px-0 md:my-10 my-2'>
          <div>
            <TopToBotAnimation>
              <p className='uppercase font-light md:text-3xl lg:text-4xl text-sm md:mb-2 mb-0'>
                khuyến mãi hot còn
              </p>
            </TopToBotAnimation>

            <h2 className='font-bold md:text-4xl lg:text-[2.75rem] text-base md:tracking-tight text-gray-900 uppercase'>
              flash sales
            </h2>
          </div>
          {/* {to && <SeeAll to={to} />} */}
        </div>
        <div className='lg:px-14 xl:px:28 px-6'>
          <ProductSliderHome products={products} />
        </div>
      </div>
    ) : null

  return product
}

export default ProductHot
