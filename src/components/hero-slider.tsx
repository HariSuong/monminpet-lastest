'use client'
import React from 'react'
import Slider, { Settings } from 'react-slick'
import Image from 'next/image'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

interface HeroSliderProps {
  images: string[]
  aspectRatio?: string // Ví dụ: "3/1" hoặc "16/9"
  customSettings?: Settings // Để tùy biến tốc độ, hiện nút hay không...
}

const HeroSlider: React.FC<HeroSliderProps> = ({ images, customSettings }) => {
  // Cài đặt mặc định
  const defaultSettings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    fade: true,
    ...customSettings // Những gì truyền vào sẽ ghi đè lên mặc định
  }

  return (
    <div className='w-full overflow-hidden'>
      <Slider {...defaultSettings}>
        {images.map((src, index) => (
          <div key={index} className='w-full outline-none'>
            <Image
              src={src}
              alt={`Banner ${index + 1}`}
              width={3840} // Theo Intrinsic size bạn chụp
              height={1280} // Tỉ lệ 3:1 để khớp với Rendered size mong muốn
              layout='responsive'
              priority={index === 0}
              className='w-full h-auto object-contain'
            />
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default HeroSlider
