'use client'

import BackLink from '@/app/(account)/_component/purchase-history/back'
import { Card } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import {
  ReviewForm,
  ReviewFormType,
  ReviewsResType
} from '@/schemaValidations/review.schema'
import reviewApiRequest from '@/services/apiReview'
import { zodResolver } from '@hookform/resolvers/zod'
import { ChevronLeft } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaStar } from 'react-icons/fa6'
import { toast, Toaster } from 'sonner'

const Review = ({
  products,
  orderId
}: {
  products: ReviewsResType['data']
  orderId: number
}) => {
  // console.log('products', products)
  const router = useRouter()
  const form = useForm<ReviewFormType>({
    resolver: zodResolver(ReviewForm),
    defaultValues: {
      reviews: products.map(product => ({
        content: '',
        id: product.id,
        rating: 5
      }))
    }
  })

  // State lưu rating riêng cho từng sản phẩm
  const [ratings, setRatings] = useState(
    products.map(product => ({
      id: product.id,
      rating: 5 // Giá trị mặc định là 5 sao
    }))
  )

  // State lưu hover rating riêng cho từng sản phẩm
  const [hoverRatings, setHoverRatings] = useState(
    products.map(product => ({
      id: product.id,
      hover: 5
    }))
  )

  // Xử lý hover từng sản phẩm
  const handleMouseEnter = (rating: number, index: number) => {
    setHoverRatings(prev =>
      prev.map((r, i) => (i === index ? { ...r, hover: rating } : r))
    )
  }

  const handleMouseLeave = (index: number) => {
    setHoverRatings(prev =>
      prev.map((r, i) => (i === index ? { ...r, hover: ratings[i].rating } : r))
    )
  }

  const handleClick = (rating: number, index: number) => {
    setRatings(prevRatings =>
      prevRatings.map((r, i) => (i === index ? { ...r, rating } : r))
    )
    // Cập nhật giá trị rating vào form
    form.setValue(`reviews.${index}.rating`, rating)
  }

  const onSubmit = async (values: ReviewFormType) => {
    try {
      // const result = await reviewApiRequest.insertReviewFromClientToNextServer(values)
      const result = await reviewApiRequest.insertReview(values)

      toast.success('Lưu thành công', {
        description: 'Chúng tôi đã cập nhật đánh giá của bạn'
      })
      //`/account/purchase-history/${products?.id}?tab=purchase-history`
      router.push(`/account/purchase-history/${orderId}?tab=purchase-history`)
      router.refresh()

      console.log('result form update', result)
    } catch (error: any) {
      console.error('Error submitting review:', error)
      const status = error.status as number

      if (status === 400) {
        toast.error('Lỗi', {
          description: 'Vui lòng kiểm tra lại'
        })
      }
    }
  }

  return (
    <div className='space-y-6'>
      <div className='flex justify-center items-center'>
        <BackLink />
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <div className='flex justify-center items-end'>
            <Card className='shadow-md md:p-16 p-4 md:w-4/5 w-full md:space-y-10 space-y-8'>
              {products.map((product, index) => (
                <div key={product.id} className='md:space-y-8 space-y-6'>
                  <div className='flex items-center md:space-x-4 space-x-2'>
                    <Image
                      src={`https://cdn.monminpet.com/storage/app/public/${product?.thumb}`}
                      alt={product.name}
                      width={80}
                      height={80}
                      className='rounded-md md:w-20 md:h-20 w-6 h-6'
                    />
                    <div>
                      <h3 className='font-medium md:text-base text-sm md:w-64 w-60 h-6 truncate'>
                        {product.name}
                      </h3>
                      <p className='text-gray-500 md:text-base text-sm font-bold md:block hidden'>
                        {product.price.toLocaleString()} VND
                      </p>
                    </div>
                  </div>

                  <div className='flex flex-col md:flex-row md:items-center items-start md:gap-4 gap-0'>
                    <p className='italic md:text-base text-sm font-bold mt-1 md:mr-0 mr-4'>
                      {' '}
                      Chất lượng sản phẩm
                    </p>
                    <div className='flex'>
                      {[1, 2, 3, 4, 5].map(star => (
                        <FaStar
                          key={star}
                          className={`w-8 h-8 ${
                            hoverRatings[index]?.hover >= star
                              ? 'text-yellow-400'
                              : 'text-gray-400'
                          } cursor-pointer`}
                          onMouseEnter={() => handleMouseEnter(star, index)}
                          onMouseLeave={() => handleMouseLeave(index)}
                          onClick={() => handleClick(star, index)}
                        />
                      ))}
                    </div>
                  </div>

                  <div className='flex flex-col md:justify-center justify-start gap-4'>
                    <FormField
                      control={form.control}
                      name={`reviews.${index}.content`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className='italic font-bold'>
                            Đánh giá
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder='Đánh giá của bạn giúp dịch vụ của chúng tôi tốt hơn!...'
                              className='md:h-40 h-20 bg-[#f8edd8] text-[#737373] placeholder:italic rounded-xl md:text-lg text-sm w-full'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Hidden Product ID */}
                    <FormField
                      control={form.control}
                      name={`reviews.${index}.id`} // Accessing specific review ID
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <input type='hidden' {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              ))}
              <div className='text-center'>
                <button
                  type='submit'
                  className='bg-gradient-to-r from-[#000000] via-[#222222] to-[#555555] text-white md:py-3 py-1 md:px-5 px-3 rounded-xl text-center font-semibold uppercase md:text-base text-sm'>
                  Đánh giá
                </button>
              </div>
            </Card>
          </div>
        </form>
        <Toaster position='top-right' richColors closeButton />
      </Form>
    </div>
  )
}

export default Review
