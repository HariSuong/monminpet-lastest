// components/product/slider-thumb.tsx
'use client'

import React, { useEffect, useRef } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Image from 'next/image'
import SampleNextArrow from '@/components/sample-next-arrow'
import SamplePrevArrow from '@/components/sample-prev-arrow'

interface SliderThumbProps {
  images: string[]
  currentSlideIndex: number
  setCurrentSlideIndex: (index: number) => void
}

const SliderThumb: React.FC<SliderThumbProps> = ({
  images,
  currentSlideIndex,
  setCurrentSlideIndex
}) => {
  const mainSliderRef = useRef<Slider>(null)
  const thumbSliderRef = useRef<Slider>(null)

  // Cấu hình cho React Slick
  const settings = {
    dots: false,

    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: (index: number) => {
      setCurrentSlideIndex(index)
      thumbSliderRef.current?.slickGoTo(index)
    },
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  }
  // Cấu hình slider thumbnail
  const thumbSettings = {
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 5,
    slidesToScroll: 1,
    focusOnSelect: true,
    // centerMode: true,
    // centerPadding: '0px',
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3
        }
      }
    ]
  }
  // Chuyển slide khi currentSlideIndex thay đổi
  useEffect(() => {
    if (mainSliderRef.current) {
      mainSliderRef.current.slickGoTo(currentSlideIndex)
    }
  }, [currentSlideIndex])

  return (
    <div className='lg:w-1/2 w-full lg:pr-10'>
      <Slider ref={mainSliderRef} {...settings}>
        {images.map((img, index) => (
          <div key={index} className='relative aspect-square'>
            {/* <img src={img} 
              alt={`Slide ${index}`}
              className='h-full w-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-105' /> */}
            <img
              src={img}
              alt={`Slide ${index}`}
              loading='lazy'
              width='500'
              height='500'
              className='object-contain w-full h-full p-1' // Make sure it stretches properly
            />

            {/* <Image
              src={img}
              alt={`Slide ${index}`}
              width={500}
              height={500}
              className='object-contain w-full h-full' // Make sure it stretches properly
              priority={index === 0} // Ưu tiên tải ảnh đầu tiên
              loading={index < 3 ? 'eager' : 'lazy'} // Tải eager cho 3 ảnh đầu
              quality={75}
              // placeholder='blur'
              // blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(800, 800))}`}
            /> */}
          </div>
        ))}
      </Slider>

      {/* Thumbnail slider */}
      <div className='max-w-[90%] mx-auto'>
        <Slider
          {...thumbSettings}
          ref={thumbSliderRef}
          asNavFor={mainSliderRef.current || undefined}>
          {images.map((img, index) => (
            <div
              key={index}
              className='px-1 cursor-pointer'
              onClick={() => setCurrentSlideIndex(index)}>
              <div
                className={`relative aspect-square border-2 ${
                  currentSlideIndex === index
                    ? 'border-[#D89C17]'
                    : 'border-transparent'
                }`}>
                <img
                  src={img}
                  alt={`Thumbnail ${index}`}
                  loading='lazy'
                  width='100'
                  height='100'
                  className='object-contain w-full h-full'
                />

                {/* <Image
                  src={img}
                  alt={`Thumbnail ${index}`}
                  width={100}
                  height={100}
                  className='object-contain w-full h-full' // Make sure it stretches properly
                  priority={index === 0} // Ưu tiên tải ảnh đầu tiên
                  loading={index < 3 ? 'eager' : 'lazy'} // Tải eager cho 3 ảnh đầu
                  quality={75}
                /> */}
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  )
}

export default SliderThumb
