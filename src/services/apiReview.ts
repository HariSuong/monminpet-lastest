import http from '@/lib/http'
import {
  ReviewFormType,
  ReviewsResType
} from '@/schemaValidations/review.schema'

const reviewApiRequest = {
  getReviews: (sessionToken: string, id: number) =>
    http.get<ReviewsResType>(`/user/accounts/review/detail/${id}`, {
      headers: {
        Authorization: `Bearer ${sessionToken}`
      },
      cache: 'no-store'
    }),
  insertReview: (body: ReviewFormType) => {
    return http.post<ReviewFormType>('/user/accounts/review/invoice', body)
  },
  // Gọi Next.js server để cập nhật thông tin người dùng
  insertReviewFromClientToNextServer: (body: ReviewFormType) => {
    return http.put<ReviewFormType>('/api/account/review', body, {
      baseUrl: ''
    })
  }
}
export default reviewApiRequest
