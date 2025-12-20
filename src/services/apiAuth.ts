import http from '@/lib/http'
import {
  ChangePassBodyType,
  ChangePassResType,
  LoginBodyType,
  LoginResType,
  PassForgotBodyType,
  PassForgotResType,
  RegisterBodyType,
  RegisterResType
} from '@/schemaValidations/auth.schema'
import { MessageResType } from '@/schemaValidations/common.schema'

const authApiRequest = {
  login: (body: LoginBodyType) => http.post<LoginResType>('/login', body),
  register: (body: RegisterBodyType) =>
    http.post<RegisterResType>('/register', body),
  auth: (body: { sessionToken: string }) =>
    http.post('api/auth', body, {
      baseUrl: ''
    }),
  passForgot: (body: PassForgotBodyType) =>
    http.post<PassForgotResType>('/password/forgot', body),
  newPass: (body: ChangePassBodyType) =>
    http.post<ChangePassResType>('/password/reset', body),
  logoutFrNextServerToServer: (sessionToken: string) =>
    http.post<MessageResType>(
      '/logout',
      {},
      {
        headers: {
          Authorization: `Bearer ${sessionToken}`
        }
      }
    ),
  logoutFrClientToNextServer: () =>
    http.post(
      '/api/auth/logout',
      {},
      {
        baseUrl: ''
      }
    )
}

export default authApiRequest
