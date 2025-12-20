import http from '@/lib/http'
import {
  CouponCheckRequestType,
  CouponCheckResponseType
} from '@/schemaValidations/coupon.schema'

const discountApiRequest = {
  checkCoupon: (body: CouponCheckRequestType) => {
    return http.post<CouponCheckResponseType>('/invoice/coupon', body, {
      cache: 'no-store'
    })
  }
}

export default discountApiRequest
