import React from 'react'

import { Product } from '../../types/products'
import ProductItem from './product-item'
import { BreadcrumbWithCustomSeparator } from '@/components/breadcrumb-with-custom-separator'
import slugify from 'slugify'

const ProductList: React.FC<{ products: Product[] }> = ({ products }) => {
  return (
    <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-xl:gap-4 gap-6'>
      {products.map(product => (
        <ProductItem
          key={product.id}
          id={product.id}
          name={product.name}
          description={product.desc || ''} // Add default value for description
          price={product.price}
          priceOld={product.price_old}
          imageUrl={product.thumb}
          isHot={product.hot}
        />
      ))}
    </div>
  )
}

export default ProductList
