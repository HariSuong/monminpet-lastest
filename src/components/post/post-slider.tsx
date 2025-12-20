import React from 'react'
import Slider from 'react-slick'
import SampleNextArrow from '../sample-next-arrow'
import SamplePrevArrow from '../sample-prev-arrow'

// css slick slider
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import PostItem from '@/components/post/post-item'

const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
  initialSlide: 0,
  // không căn giữa
  centerMode: false,
  centerPadding: '0px',
  nextArrow: <SampleNextArrow className='right-0 md:right-4' />,
  prevArrow: <SamplePrevArrow className='w-28 h-28 md:w-50 md:h-50' />,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        infinite: false,
        dots: false
      }
    }
  ]
}

const PostSlider: React.FC<{ posts: PostItem[] }> = ({ posts }) => {
  // console.log('posts', posts)
  return (
    <Slider {...settings} className='post-slider'>
      {posts.map(post => (
        <div className='md:p-4 p-2' key={post.id}>
          <PostItem
            key={post.id}
            id={post.id} // Add this line
            title={post.title}
            desc={post.desc}
            thumb={post.thumb}
            count_view={post.count_view} // Add this line
            slide={true}
          />
        </div>
      ))}
    </Slider>
  )
}

export default PostSlider
