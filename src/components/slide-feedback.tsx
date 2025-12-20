'use client'

import React from 'react'
import Slider from 'react-slick'

// css slick slider
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import Image from 'next/image'
import { HiStar } from 'react-icons/hi2'
import SampleNextArrow from './sample-next-arrow'
import SamplePrevArrow from './sample-prev-arrow'

const feedbacks = [
  {
    id: 1,
    name: 'Mẹ bé Mon',
    message:
      'Bé nhà mình có lần ăn phải hàng trôi nổi nên bị bệnh đường ruột, may tìm được shop này bán súp thưởng hàng chính hãng. Mọi người yên tâm mua nhé.',
    avatar: '/feedback/mebemon.jpg'
  },
  {
    id: 2,
    name: 'Suzy Nguyen',
    message:
      'Shop bán sữa tắm Mypet mùi rất thơm, tắm mà tận 2 ngày sau vẫn còn mùi thoang thoảng. Tắm xong lông mềm, mượt, để xem có giảm rụng lông ko mình sẽ quay lại feedback sau.',
    avatar: '/feedback/suzynguyen.jpg'
  },
  {
    id: 3,
    name: 'An Khuê',
    message:
      'Ai muốn chó sống lâu thì mua Fera Pets của shop này nha mọi người. Chó nhà mình từ lúc dùng sản phẩm của shop thì sức khỏe cải thiện hẳn.',
    avatar: '/feedback/ankhue.jpg'
  },
  {
    id: 4,
    name: 'Bống',
    message:
      'Shop bán cát mèo giá hơi chát hơn so với các loại khác. Bù lại cát không có bụi, khử mùi tốt. Sẽ quay lại ủng hộ tiếp.',
    avatar: '/feedback/bong.jpg'
  },
  {
    id: 5,
    name: 'Phạm An Nhiên',
    message:
      'Đóng gói cẩn thận, giao hàng nhanh, nhân viên tư vấn nhiệt tình, hàng chất lượng cao cấp. Sẽ giới thiệu bạn bè ủng hộ.',
    avatar: '/feedback/phamannhien.jpg'
  }
]

const settings = {
  dots: false,
  infinite: true,
  speed: 1000,
  slidesToShow: 3,
  slidesToScroll: 1,
  initialSlide: 0,
  nextArrow: <SampleNextArrow className='right-0 md:right-4' />,
  prevArrow: <SamplePrevArrow className='w-28 h-28 md:w-50 md:h-50' />,
  responsive: [
    // {
    //   breakpoint: 1024,
    //   settings: {
    //     slidesToShow: 3,
    //     slidesToScroll: 3,
    //     infinite: true,
    //     dots: true
    //   }
    // },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        initialSlide: 2,
        infinite: true
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true
      }
    }
  ]
}

const SlideFeedback: React.FC = () => {
  return (
    <Slider {...settings}>
      {feedbacks.map(feedback => (
        <div key={feedback.id}>
          <div className='flex flex-col gap-3 md:mt-20 mt-0 xl:space-x-16 space-x-5'>
            <div className='self-center'>
              <Image
                src={feedback.avatar}
                width={224}
                height={224}
                className='xl:w-56 lg:w-40 md:w-36 w-32 mb-5 object-cover aspect-square rounded-full'
                alt={feedback.name}
              />
            </div>

            <div className='flex'>
              <HiStar className='fill-yellow-600' />
              <HiStar className='fill-yellow-600' />
              <HiStar className='fill-yellow-600' />
              <HiStar className='fill-yellow-600' />
              <HiStar className='fill-yellow-600' />
            </div>
            <h3 className='font-semibold xl:text-2xl lg:text-xl md:text-lg'>
              {feedback.name}
            </h3>
            <p className='lg:text-lg md:text-base'>{feedback.message}</p>
          </div>
        </div>
      ))}
    </Slider>
  )
}

export default SlideFeedback
