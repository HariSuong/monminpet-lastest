import React from 'react'
import SeeAll from './see-all'
import TopToBotAnimation from '@/components/common/top-to-bot'
import LeftToRightAnimation from '@/components/common/left-to-right'

interface TitleProps {
  title: string
  subtitle?: string
  to?: string
}

const Title: React.FC<TitleProps> = ({ title, subtitle, to }) => {
  return (
    <div className='flex items-center justify-between px-0 my-2 container'>
      <div className='hidden lg:block'>
        <TopToBotAnimation>
          <p className='uppercase font-light md:text-3xl lg:text-4xl text-sm md:mb-2 mb-0'>
            {subtitle}
          </p>
        </TopToBotAnimation>
        <LeftToRightAnimation>
          <h2 className='font-bold md:text-4xl lg:text-[2.75rem] text-base md:tracking-tight text-gray-900 uppercase'>
            {title}
          </h2>
        </LeftToRightAnimation>
      </div>
      {/* Mobile */}
      <div className='lg:hidden block'>
        <p className='uppercase font-light md:text-xl text-sm md:mb-2 mb-0'>
          {subtitle}
        </p>

        <h2 className='font-bold md:text-2xl text-base md:tracking-tight text-gray-900 uppercase'>
          {title}
        </h2>
      </div>
      {to && <SeeAll to={to} />}
    </div>
  )
}

export default Title
