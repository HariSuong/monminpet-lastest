import Banner from '@/components/banner'
import ButtonService from '@/components/common/button-service'
import MotionText from '@/components/common/motion-text'
import Title from '@/components/title'
import Image from 'next/image'
import React from 'react'

const PetVaccination = () => {
  const listItems: string[] = [
    'Bảo vệ sức khoẻ thú cưng',
    'Lá chắn sức khoẻ cho gia đình bạn',
    'Bảo vệ vật nuôi khác',
    'Tiết kiệm chi phí chăm sóc sức khoẻ khác'
  ]
  return (
    <div className='md:block hidden'>
      <div className='bg-cover bg-center relative'>
        <Banner type='video' time={3000} url='/home/dogs.mp4' />
        {/* Lớp phủ mờ chỉ cho background image */}
        {/* <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black via-transparent to-transparent opacity-40 z-10'></div> */}

        {/* Lớp chứa hình ảnh nền */}
        <div
          className='absolute top-0 left-0 w-full h-full object-cover bg-center z-11'
          // style={{ backgroundImage: "url('/home/bg-gradient.png')" }}
        >
          <Image
            fill
            src='/home/bg-gradient.png'
            alt='Background Gradient'
            className='w-full h-full object-cover'
          />
        </div>

        <div
          className='absolute top-0 left-0 w-full lg:w-10/12 h-full object-cover bg-center md:bg-left z-11'
          // style={{ backgroundImage: "url('/home/bg-gradient.png')" }}
        >
          <div className='w-full h-full'>
            <div className='xl:w-3/4 w-full h-full flex flex-col justify-center lg:pl-24 md:pl-8 pl-0'>
              <Title
                title='tiêm chủng cho thú cưng'
                subtitle='Tầm quan trọng của'
              />

              {/* Render ClientSideList chỉ ở client */}
              <MotionText items={listItems} />
              <div className='flex justify-center lg:pt-5 pt-1'>
                <div className='w-1/2'>
                  <ButtonService
                    title='Đọc thêm'
                    linkUrl='https://monminpet.com/services/vaccine/10'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PetVaccination
