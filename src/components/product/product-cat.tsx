'use client'

import { SkeletonCard } from '../skeleton-card'
import Title from '../title'
import ProductSlider from './product-slider'

import { Category } from '@/types/cats'
import slugify from 'slugify'

const ProductCat: React.FC<{ productsCat: Category[] }> = ({ productsCat }) => {
  console.log('productsCat', productsCat)

  const products = productsCat?.map(cat => {
    if (cat.products.length === 0) return null
    return (
      <div key={cat.id}>
        {/* <h2 className='text-2xl font-bold mb-4'>{cat.name}</h2> */}
        <div className='container'>
          <Title
            title={cat.name}
            subtitle='best seller'
            to={`/products/${slugify(cat?.name || '', {
              lower: true,
              strict: true,
              locale: 'vi'
            })}?catId=${cat.id}&page=1`}
          />
        </div>

        <div>
          <div className='py-4 lg:max-w-7xl sm:max-w-full lg:pb-28'>
            <ProductSlider products={cat.products} />
          </div>
        </div>
      </div>
    )
  })

  return (
    <div className='py-4 sm:py-24 lg:mx-auto lg:max-w-7xl lg:px-8'>
      {products}
    </div>
  )
}

export default ProductCat
