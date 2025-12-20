import React from 'react'

import Title from '../title'
import SlideFeedback from '../slide-feedback'
import Image from 'next/image'
import TopToBotAnimation from '@/components/common/top-to-bot'

const FeedBack: React.FC = () => {
  return (
    <div className='md:my-40 my-16 relative lg:px-[4.5rem] container'>
      <Image
        src='/icon/iconquote.png'
        width={48}
        height={48}
        className='w-8 md:w-12 absolute md:-top-10 md:left-14 left-7 -top-8'
        alt='Icon Quote'
      />

      <div className='container flex items-center justify-between md:hidden sm:px-6 md:px-0 md:my-10  my-2'>
        <div>
          <TopToBotAnimation>
            <p className='uppercase font-light md:text-3xl lg:text-4xl text-sm md:mb-2 mb-0'>
              khách hàng nói gì?
            </p>
          </TopToBotAnimation>

          <h2 className='font-bold md:text-4xl lg:text-[2.75rem] text-base md:tracking-tight text-gray-900 uppercase'>
            FEEDBACK
          </h2>
        </div>
        {/* {to && <SeeAll to={to} />} */}
      </div>
      <div className='container lg:px-0 md:block hidden'>
        <Title title='FEEDBACK' subtitle='khách hàng nói gì?' />
      </div>
      <div className='lg:px-14 px-6'>
        <SlideFeedback />
      </div>
    </div>
  )
}

export default FeedBack
