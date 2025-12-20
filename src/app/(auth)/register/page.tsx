import React from 'react'
import RegisterForm from './register-form'
import TitleAuth from '@/app/(auth)/_component/title-auth'
import { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Đăng ký',
  description: 'Trở thành thành viên của chúng tôi để nhận nhiều ưu đãi.',
  robots: {
    index: false,
    follow: false, // Google không cần đi theo các link trong trang này
  },
};

const RegisterPage = () => {
  return (
    <div className='container flex flex-col items-center gap-6 pt-40 md:py-20'>
      <TitleAuth title='đăng ký tài khoản' />
      <RegisterForm />
    </div>
  )
}

export default RegisterPage
