'use client'
import React from 'react'
import Slider from 'react-slick'
import SampleNextArrow from '../sample-next-arrow'
import SamplePrevArrow from '../sample-prev-arrow'

// css slick slider
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import ProductItem from '@/components/product/product-item'

const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  initialSlide: 0,
  nextArrow: <SampleNextArrow className='right-0 md:right-4' />,
  prevArrow: <SamplePrevArrow className='w-28 h-28 md:w-50 md:h-50' />,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true
        // dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        initialSlide: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
        dots: false
      }
    }
  ]
}

const ProductSliderHome: React.FC<{ products: ProductHome[] }> = ({
  products
}) => {
  // console.log('products', products)

  return (
    <Slider {...settings}>
      {products.map(product => (
        <ProductItem
          key={product.id}
          id={product.id} // Add this line
          name={product.name}
          price={product.price}
          imageUrl={product.thumb}
          priceOld={product.price_old}
          countdownTimer={product.countdown_timer}
        />
      ))}
    </Slider>
  )
}

export default ProductSliderHome
