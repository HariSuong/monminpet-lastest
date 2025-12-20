import React from 'react'
import { CountdownRenderProps } from 'react-countdown'

const CountdownUI: React.FC<{
  hours: number
  minutes: number
  seconds: number
}> = ({ hours, minutes, seconds }) => {
  return (
    <div className='flex justify-center mt-5 items-center'>
      {/* <h2 className='uppercase text-2xl font-normal'>Khuyến mãi hot còn</h2> */}
      <div className='flex items-center md:space-x-3 space-x-1'>
        <div className='md:w-9 w-7 md:h-9 h-7 text-white font-medium md:text-xl text-base flex justify-center items-center bg-[#d89c17]'>
          {hours}
        </div>
        <span>:</span>
        <div className='md:w-9 w-7 md:h-9 h-7 text-white font-medium md:text-xl text-base flex justify-center items-center bg-[#d89c17]'>
          {minutes}
        </div>
        <span>:</span>

        <div className='md:w-9 w-7 md:h-9 h-7 text-white font-medium md:text-xl text-base flex justify-center items-center bg-[#d89c17]'>
          {seconds}
        </div>
      </div>
    </div>
  )
}

export default CountdownUI
