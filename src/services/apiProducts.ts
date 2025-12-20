// src/services/apiProducts.js

import http from '@/lib/http'
import { CategoryRes } from '@/types/cats'
import {
  CouponRes,
  ProductDetailRes,
  ProductPaginationRes
} from '@/types/products'

const productApiRequest = {
  getProductsCat:()=> http.get<CategoryRes>('/products', {
    // cache: 'no-store'
     next: {
      revalidate: 0
    }
  }),
  getProducts: (catId: number, page: number, orderBy?: any) =>
    http.get<ProductPaginationRes>(
      `/products/${catId}?page=${page}${orderBy ? `&orderby=${orderBy}` : ''}`,
      {
        // cache: 'no-store'
         next: {
          revalidate: 0
        }
      }
    ),
  getDetail: (id: number, sessionToken: string) =>
    http.get<ProductDetailRes>(`/products/detail/${id}`, {
      headers: {
        Authorization: `Bearer ${sessionToken}`
      },
      cache: 'no-store'
    })
}

export default productApiRequest
