import { useState } from 'react'

interface Review {
  name: string
  rating: number
  content: string | null
  created_at: string
}

interface ProductReviewsProps {
  reviews: Review[]
}
const ProductReviews: React.FC<ProductReviewsProps> = ({ reviews }) => {
  // console.log('reviews', reviews)
  const [visibleReviews, setVisibleReviews] = useState(10)
  if (reviews.length === 0) {
    return <p></p>
  }
  const loadMoreReviews = () => {
    setVisibleReviews(prev => prev + 10)
  }

  return (
    <div className='mt-10 w-full'>
      <h2 className='text-gray-900 md:text-3xl text-lg title-font font-medium mb-1 uppercase'>
        Đánh giá sản phẩm
      </h2>

      <div className='space-y-4'>
        {reviews.slice(0, visibleReviews).map((review, index) => (
          <div key={index} className='border p-4 rounded-lg shadow-sm'>
            <div className='flex items-center mb-2'>
              <div className='flex items-center text-yellow-500'>
                {/* Hiển thị sao đánh giá */}
                {[...Array(review.rating)].map((_, i) => (
                  <span key={i} className='text-yellow-500'>
                    ★
                  </span>
                ))}
                {[...Array(5 - review.rating)].map((_, i) => (
                  <span key={i} className='text-gray-300'>
                    ★
                  </span>
                ))}
              </div>
              <span className='ml-3 text-lg font-medium'>{review.name}</span>
            </div>
            <p className='text-gray-600 md:text-base text-sm'>
              {review.content || 'Chưa có mô tả.'}
            </p>
            <p className='text-sm text-gray-400 mt-2'>
              Đánh giá vào {new Date(review.created_at).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>

      {visibleReviews < reviews.length && (
        <button
          className='mt-4 text-[#F8EDD8] hover:text-[#D89C17] font-semibold'
          onClick={loadMoreReviews}>
          Xem thêm {reviews.length - visibleReviews} đánh giá
        </button>
      )}
    </div>
  )
}

export default ProductReviews
