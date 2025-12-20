import http from '@/lib/http'
import {
  MessageBody,
  ServiceCatRes,
  ServiceDetailRes,
  ServiceMessageRes
} from '@/types/services'
// src/services/apiProducts.js

const serviceApiRequest = {
  getServices: () => http.get<ServiceCatRes>('/services', {
    cache: 'no-store'
  }),
  getDetailService: (id: number) =>
    http.get<ServiceDetailRes>(`/services/detail/${id}`, {
      cache: 'no-store'
    }),
  submitMessage: (body: MessageBody) => {
    return http.post<ServiceMessageRes>('/messages', body)
  }
}

export default serviceApiRequest
