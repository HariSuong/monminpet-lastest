'use client'
import InfoDetail from '@/app/(account)/_component/purchase-history/info-detail'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { StarFilledIcon } from '@radix-ui/react-icons'
import { FaRegStarHalfStroke, FaStar, FaRegStar } from 'react-icons/fa6'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import BackLink from '@/app/(account)/_component/purchase-history/back'
import { cookies } from 'next/headers'
import accountApiRequest from '@/services/apiAccount'
import { useCart } from '@/context/CartContext'
import { useRouter } from 'next/navigation'
import BuyAgain from '@/app/(account)/_component/purchase-history/buy-again'
import { InvoiceType } from '@/schemaValidations/invoice.schema'
import slugify from 'slugify'

interface Product {
  product_id: number
  name: string
  price: number
  thumb: string
  quantity: number
  rating: number
  content: string | null
}

const PurchaseDetail = ({ invoiceDetail }: { invoiceDetail: InvoiceType }) => {
  console.log('invoiceDetail', invoiceDetail)
  const averageStar =
    invoiceDetail.products.reduce((acc, product) => acc + product.rating, 0) /
    invoiceDetail.products.length

  return (
    <div className='flex flex-col justify-center items-center md:text-base text-sm'>
      <BackLink />
      <Card className='shadow-md p-4 md:w-4/5 w-full'>
        <div className='mb-4 w-fit md:text-xl text-sm px-4 py-2'>
          Chi tiết đơn hàng {'>'}
        </div>
        <div className='my-10 flex flex-col lg:flex-row md:gap-16'>
          <div className='lg:w-2/5 w-full'>
            <div className='space-y-4'>
              {invoiceDetail.products.map(product => (
                <div key={product.product_id} className='flex gap-20'>
                  {/* Product details */}
                  <div className='space-y-6'>
                    <div className='flex items-center space-x-4'>
                      <div className='flex-shrink-0'>
                        <Image
                          src={`https://cdn.monminpet.com/storage/app/public/${product?.thumb}`}
                          alt={product.name}
                          width={80}
                          height={80}
                          className='w-20 h-20 object-cover rounded-md'
                        />
                      </div>
                      <div>
                        <div className='flex justify-between'>
                          <Link
                            href={`/products/${slugify(product.name || '', {
                              lower: true,
                              strict: true,
                              locale: 'vi'
                            })}/${product.product_id}`}>
                            <h3 className='md:text-lg text-base md:font-semibold font-medium'>
                              {product.name}
                            </h3>
                          </Link>
                          <p className='text-sm text-gray-500'>
                            x{product.quantity}
                          </p>
                        </div>
                        {/* <p className='text-sm text-gray-500'>{product.desc}</p> */}
                        <p className='md:text-xl text-base font-bold'>
                          {product.price.toLocaleString('vi-VN', {
                            currency: 'VND'
                          })}
                          đ
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className='flex flex-col justify-between lg:w-3/5 w-full md:gap-16'>
            {/* Action Buttons */}
            <div className='flex flex-col lg:flex-row justify-between'>
              <p className='lg:w-1/5 w-full md:text-base text-sm text-gray-500 italic mt-2'>{`${invoiceDetail.products.length} sản phẩm`}</p>
              {/* Price & Total */}
              <div className='lg:w-4/5 w-full'>
                <p className='font-bold flex justify-between gap-3 mt-2'>
                  <span className='text-gray-500 italic'>Tổng tiền hàng:</span>
                  <p className='text-[#b00303]'>
                    {Number(invoiceDetail.total).toLocaleString('vi-VN', {
                      currency: 'VND'
                    })}
                    đ
                  </p>
                </p>
                <p className='font-bold flex justify-between gap-3 mt-2'>
                  <span className='text-gray-500 italic'>Phí vận chuyển:</span>
                  <p className='text-[#b00303]'>
                    {invoiceDetail.fee.toLocaleString('vi-VN', {
                      currency: 'VND'
                    })}
                    đ
                  </p>
                </p>
                <p className='font-bold flex justify-between gap-3 mt-2'>
                  <span className='text-gray-500 italic'>Ưu đãi:</span>
                  <p className='text-[#b00303]'>
                    {invoiceDetail?.discount.toLocaleString('vi-VN', {
                      currency: 'VND'
                    })}
                    đ
                  </p>
                </p>
                <p className='font-bold flex justify-between gap-3 mt-2'>
                  <span className='text-gray-500 italic'>Thành tiền:</span>
                  <p className='text-[#b00303]'>
                    {Number(invoiceDetail?.amount).toLocaleString('vi-VN', {
                      currency: 'VND'
                    })}
                    đ
                  </p>
                </p>
              </div>
            </div>
          </div>
        </div>

        <InfoDetail
          infoDetail={{
            name: invoiceDetail.name,
            phone: invoiceDetail.phone,
            address: invoiceDetail.address,
            method: invoiceDetail.method,

            received_at: invoiceDetail.received_at || '',
            created_at: invoiceDetail.created_at || ''
          }}
        />

        <div className='flex flex-col justify-between md:mt-0 mt-4'>
          {/* Action Buttons */}
          <div className='flex flex-col md:flex-row justify-between items-center md:gap-0 gap-4'>
            <div className='flex gap-2 self-start'>
              <p className='italic md:text-base text-sm'>Đánh giá của bạn: </p>

              <div className='flex items-center'>
                {/* Vẽ các sao đầy đủ */}
                {[...Array(Math.floor(averageStar))].map((_, i) => (
                  <FaStar
                    key={i}
                    className='md:w-6 w-4 md:h-6 h-4 text-yellow-400'
                  />
                ))}

                {/* Vẽ nửa sao nếu có */}
                {averageStar % 1 !== 0 && (
                  <FaRegStarHalfStroke className='md:w-6 w-4 md:h-6 h-4 text-yellow-400' />
                )}

                {/* Vẽ các sao rỗng */}
                {[...Array(5 - Math.ceil(averageStar))].map((_, i) => (
                  <FaRegStar
                    key={i}
                    className='md:w-6 w-4 md:h-6 h-4 text-yellow-400'
                  />
                ))}
              </div>
            </div>

            <div className='flex justify-end gap-2'>
              <Link
                href={`/account/review/${invoiceDetail.id}?tab=purchase-history`}
                className='bg-gradient-to-r from-[rgb(0,0,0)] via-[#222222] to-[#555555] text-white px-4 py-2 text-sm text-center font-semibold uppercase rounded-md'>
                Đánh giá
              </Link>

              <BuyAgain
                jsonInvoices={JSON.stringify(invoiceDetail.json_invoices)}
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default PurchaseDetail
