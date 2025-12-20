import TitleAuth from '@/app/(auth)/_component/title-auth'
import PasswordResetForm from '@/app/(auth)/password-reset/password-reset-form'
import React from 'react'
import { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Quên mật khẩu',
  description: 'Trở thành thành viên của chúng tôi để nhận nhiều ưu đãi.',
  robots: {
    index: false,
    follow: false, // Google không cần đi theo các link trong trang này
  },
};

const PasswordReset = () => {
  return (
    <div className='container flex flex-col items-center gap-6 pt-40 md:py-20'>
      <TitleAuth title='đổi mật khẩu' />
      <PasswordResetForm />
    </div>
  )
}

export default PasswordReset
