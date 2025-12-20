import http from '@/lib/http'
import {
  CheckoutBodyType,
  CheckoutResType
} from '@/schemaValidations/checkout.schema'

const checkoutApiRequest = {
  submitCheckout: (body: CheckoutBodyType) => {
    return http.post<CheckoutResType>('/invoice', body)
  }
}

export default checkoutApiRequest
