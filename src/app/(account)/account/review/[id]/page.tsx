import Review from '@/app/(account)/_component/purchase-history/review'
import TabsComponent from '@/app/(account)/_component/tabs-component'
import Loading from '@/app/(account)/account/loading'
import reviewApiRequest from '@/services/apiReview'
import { cookies } from 'next/headers'
import React, { Suspense } from 'react'



const ReviewPage = async ({ params }: { params: { id: string } }) => {
  const cookieStore = cookies()
  const sessionToken = cookieStore.get('sessionToken')
  const reviewId = Number(params.id)

  if (!sessionToken?.value) return <div>Chưa đăng nhập</div>
  const reviews = await reviewApiRequest.getReviews(
    sessionToken?.value,
    reviewId
  )

  return (
    <TabsComponent
      activeTab={'purchase-history'}
      purchaseTab={
        <Suspense fallback={<Loading />}>
          {/* Chờ cho reviews được tải xong */}
          <Review products={reviews.payload.data} orderId={reviewId} />
        </Suspense>
      }
    />
  )
}

export default ReviewPage
