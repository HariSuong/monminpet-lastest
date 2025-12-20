import Video from '@/components/video'
import React from 'react'

const ProductVideoService: React.FC = () => {
  return (
    <div className='flex lg:flex-row flex-col h-full overflow-hidden items-center py-12 lg:gap-6'>
      <div className='w-full lg:w-[45%] flex flex-col justify-center items-start p-10 bg-white lg:pl-40 lg:space-y-8'>
        <div className='transition-transform transform translate-x-0 delay-500 duration-1000'>
          <h1 className='text-sm md:text-2xl lg:text-3xl !leading-normal font-bold'>
            ĐẶT THÚ CƯNG CỦA <br className='hidden md:block' /> BẠN LÊN HÀNG ĐẦU
          </h1>
        </div>
        <div className='transition-transform transform translate-y-0 delay-700 duration-1000'>
          <p className='text-xs md:text-base lg:text-lg'>
            Chúng tôi đảm bảo sản phẩm được <br className='hidden md:block' />
            kiểm nghiệm và chọn lọc kỹ càng bởi
            <br className='hidden md:block' /> đội ngũ Bác sĩ Thú Y tại MonMin
            Pet <br className='hidden md:block' /> giàu kinh nghiệm.
          </p>
        </div>
      </div>
      <div className='w-full lg:w-[55%] relative'>
        <Video
          url='product/video-pet-product.mp4'
          time={3000}
          className='w-full h-4/5 object-cover'
        />

        {/* <video
          className='w-full h-4/5 object-cover'
          src='product/video-pet-product.mp4'
          controls
          autoPlay
          loop
          muted
        /> */}
      </div>
    </div>
  )
}

export default ProductVideoService
