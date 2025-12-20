// @ts-nocheck

'use client'
import React from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import Image from 'next/image'
import { BiSolidLock } from 'react-icons/bi'

import { LockIcon, LockKeyhole } from 'lucide-react'
import { AccountGiftResType } from '@/schemaValidations/account.schema'
import Link from 'next/link'
import slugify from 'slugify'
import { useCart } from '@/context/CartContext'
import { useRouter } from 'next/navigation'
import { generateCartItemId } from '@/lib/helper'
import { ProductDetail, ProductPoint } from '@/types/products'

const ProductGift: React.FC<{ products: AccountGiftResType }> = ({
  products
}) => {
  const { addToCart } = useCart()
  const router = useRouter()

  console.log('gift', products.data.products)

  const handleAddToCart = (product: ProductPoint) => {
    let attributesToAdd = []

    if (product.attributes && product.attributes.length > 0) {
      // Lấy thuộc tính mặc định
      attributesToAdd = [product.attributes[0].product_attribute[0]]
    }

    const cartItem = {
      id: generateCartItemId(attributesToAdd, product.id),
      name: product.name,
      price: 0, // Gán giá là 0 cho sản phẩm quà tặng
      quantity: 1,
      attributes: attributesToAdd,
      point: product.point_change,
      total: 0 // Total cũng là 0
    }
    addToCart(cartItem, product.thumb, product.attributes)
    // toast.success(`${product.name} đã được thêm vào giỏ hàng!`)
    router.push('/cart')
  }

  return (
    <div className='my-10 flex flex-col items-center'>
      <div className='lg:w-10/12 w-full'>
        <h2 className='mb-4 w-fit bg-black text-white uppercase font-bold md:text-xl text-base md:px-4 px-2 md:py-2 py-1'>
          Đổi quà
        </h2>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          {products.data.products.map((product, index) => (
            <Card
              key={index}
              className={`${
                product.lock === 1
                  ? 'pointer-events-none cursor-not-allowed bg-black bg-opacity-25'
                  : 'bg-transparent'
              }`}>
              <div className='flex flex-col md:flex-row items-center justify-center p-2 gap-4'>
                <div className='flex-shrink-0 relative'>
                  <Image
                    src={product.thumb}
                    alt={product.name}
                    width={80}
                    height={80}
                    className={`w-20 h-20 object-cover rounded-md ${
                      product.lock === 1
                        ? 'pointer-events-none cursor-not-allowed'
                        : ''
                    }`}
                  />

                  {product.lock === 1 && (
                    <div className='absolute top-0 left-0 flex justify-center items-center w-full h-full bg-black bg-opacity-60'>
                      <BiSolidLock className='w-8 h-8 text-white opacity-75' />
                    </div>
                  )}
                </div>

                <div className='flex flex-col justify-between flex-grow'>
                  <CardContent className='p-0'>
                    <div className='flex justify-between items-start'>
                      <div className='flex gap-2 items-start'>
                        <div className='px-1 mt-1 border border-[#b00303] text-white'>
                          <p className='text-xs text-[#b00303] text-nowrap'>
                            Quà tặng
                          </p>
                        </div>
                        <h3 className='font-semibold uppercase md:w-64 w-48 h-8 truncate cursor-pointer'>
                          <Link
                            href={`/products/${slugify(product.name || '', {
                              lower: true,
                              strict: true,
                              locale: 'vi'
                            })}/${product.id}`}>
                            {product.name}
                          </Link>
                        </h3>
                      </div>
                      <p className='text-sm text-gray-500 italic'>x1</p>
                    </div>
                    <p className='text-sm text-gray-500 line-clamp-3'>
                      {product.desc}
                    </p>
                    {product.classify && (
                      <p className='text-sm text-gray-500'>
                        Phân loại: {product.classify}
                      </p>
                    )}

                    <div className='flex gap-2 items-center mt-2'>
                      <p className='md:text-xl text-base font-bold line-through'>
                        {product.price.toLocaleString()}đ
                      </p>

                      <p
                        className={`md:text-xl text-base font-bold ${
                          product.lock === 1 ? 'text-black' : 'text-red-500'
                        }`}>
                        ({Number(product.point_change).toLocaleString()} điểm)
                      </p>
                    </div>
                  </CardContent>
                </div>
                <CardFooter className='p-0'>
                  <Button
                    className={`w-full ${
                      product.lock === 1
                        ? 'bg-black hover:bg-black opacity-75 cursor-not-allowed'
                        : 'bg-[#b00303] hover:bg-red-600'
                    } text-white rounded-none py-2`}
                    onClick={() => handleAddToCart(product)}>
                    ĐỔI
                  </Button>
                </CardFooter>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductGift
