'use client'

import React from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { useRouter, useSearchParams } from 'next/navigation'

const ProductFilter = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const orderBy = searchParams.get('orderBy') || 'created_at desc'

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())

    // Giữ lại các query params hiện có
    const catId = searchParams.get('catId')
    const page = searchParams.get('page')

    if (catId) params.set('catId', catId)
    if (page) params.set('page', page)

    if (value && value !== 'created_at desc') {
      params.set('orderBy', value)
    } else {
      params.delete('orderBy')
    }
    // Sử dụng router.replace để thay đổi URL và trigger re-render
    router.replace(`?${params.toString()}`, { scroll: false })
  }

  return (
    <div className='flex gap-3 justify-center items-center'>
      <p>Lọc theo:</p>

      <Select onValueChange={handleChange} value={orderBy}>
        <SelectTrigger className='w-[180px] bg-black text-white border-none'>
          <SelectValue placeholder='Sản phẩm bán chạy' />
        </SelectTrigger>
        <SelectContent className='border-none'>
          <SelectGroup>
            <SelectItem
              className='hover:bg-black hover:text-white text-white bg-black/40'
              value='created_at desc'>
              Sản phẩm mới nhất
            </SelectItem>{' '}
            <SelectItem
              className='hover:bg-black hover:text-white text-white bg-black/40'
              value='bestseller desc'>
              Sản phẩm bán chạy
            </SelectItem>
            <SelectItem
              className='hover:bg-black hover:text-white text-white bg-black/40'
              value='price desc'>
              Giá (từ cao đến thấp)
            </SelectItem>
            <SelectItem
              className='hover:bg-black hover:text-white text-white bg-black/40'
              value='price asc'>
              Giá (từ thấp đến cao)
            </SelectItem>
            {/* <SelectItem
              className='hover:bg-black hover:text-white text-white bg-black/40'
              value='stock'>
              Sản phẩm còn hàng
            </SelectItem> */}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}

export default ProductFilter
