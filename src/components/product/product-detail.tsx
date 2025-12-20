'use client'

import { SkeletonCard } from '@/components/skeleton-card'
import slugify from 'slugify'

import { BreadcrumbWithCustomSeparator } from '../breadcrumb-with-custom-separator'
import { Faq } from '../faq'

import ProductContent from './product-content'
import ProductInfo from './product-info'
import SliderThumb from './slider-thumb'
import { Coupon, type ProductDetail } from '@/types/products'
import { useState } from 'react'
import ProductReviews from '@/components/product/product-reviews'
import Title from '@/components/title'
import PostSlider from '@/components/post/post-slider'
import ProductSlider from '@/components/product/product-slider'

const ProductDetail = ({ product }: { product: ProductDetail }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)

  // console.log('product', product)

  // Hàm xử lý khi click vào thuộc tính
  const handleAttributeClick = (imageUrl: string) => {
    const index = (product.imgs ?? []).findIndex(img => img === imageUrl)
    if (index !== -1) setCurrentSlideIndex(index)
  }

  return (
    <div className='container mx-auto py-24 md:pt-32 md:pb-16 lg:pt-40'>
      <BreadcrumbWithCustomSeparator
        corePage='Sản phẩm'
        coreLink={`/products`}
        parentLink={`/products/${slugify(product?.menus?.name || '', {
          lower: true,
          strict: true,
          locale: 'vi'
        })}?catId=${product?.menus?.id ?? ''}&page=1`}
        currentPage={product?.name!}
        parentPage={product?.menus?.name || ''}
      />
      <div className='lg:w-4/5 mx-auto flex flex-wrap'>
        {/* Slider */}
        <SliderThumb
          images={product.imgs ?? []}
          currentSlideIndex={currentSlideIndex}
          setCurrentSlideIndex={setCurrentSlideIndex}
        />

        <ProductInfo
          reviews={product?.reviews}
          id={product?.id}
          name={product?.name}
          desc={product?.desc!}
          quantity_sold={product?.bestseller}
          image={product?.imgs?.[0] ?? ''}
          price_text={product?.price_text ?? '0'}
          price_old_text={product?.price_old_text ?? '0'}
          suggests={product?.suggests || []}
          attributes={product?.attributes}
          onAttributeClick={handleAttributeClick} // Truyền hàm xử lý
          coupons={product?.coupons || []}
        />
        <ProductContent content={product?.content} />
        {/* <SliderThumb images={product.imgs} />
          <ProductInfo product={product} />
          <ProductDetail product={product} /> */}
        {/* Phần đánh giá sản phẩm */}
        {product?.reviews && <ProductReviews reviews={product.reviews || []} />}
        {(product?.faqs || []).length > 0 && <Faq faqs={product.faqs} />}
      </div>
      {product?.related && product.related.length > 0 && (
        <div className='mt-12'>
          <Title
            title={'Sản phẩm liên quan'}
            subtitle=''
            to={`/products/${slugify(product?.menus?.name || '', {
              lower: true,
              strict: true,
              locale: 'vi'
            })}?catId=${product?.menus?.id ?? ''}&page=1`}
          />
          <div className='p-0 lg:py-4 w-full lg:max-w-7xl sm:max-w-full md:mb-12 mb-6'>
            <ProductSlider products={product?.related} />
          </div>
        </div>
      )}

      {product?.posts && product?.posts.length > 0 && (
        <div>
          <Title title={'Bài viết gợi ý'} subtitle='' to={`/posts`} />
          <div className='p-0 lg:py-4 w-full lg:max-w-7xl sm:max-w-full md:mb-12 mb-6'>
            <PostSlider posts={product?.posts} />
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductDetail
