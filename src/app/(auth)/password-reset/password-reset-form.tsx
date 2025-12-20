'use client'

import ButtonSubmit from '@/app/(auth)/_component/button-submit'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import {
  PassForgotBody,
  PassForgotBodyType,
  PassResetForm,
  PassResetFormType
} from '@/schemaValidations/auth.schema'
import authApiRequest from '@/services/apiAuth'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

const PasswordResetForm = () => {
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState<'enterEmail' | 'resetPass'>('enterEmail')
  const [email, setEmail] = useState('')

  const router = useRouter()

  const emailForm = useForm<PassForgotBodyType>({
    resolver: zodResolver(PassForgotBody),
    defaultValues: {
      email: ''
    }
  })

  const resetForm = useForm<PassResetFormType>({
    resolver: zodResolver(PassResetForm),
    defaultValues: {
      otp: '',
      password: '',
      confirmPassword: ''
    }
  })

  const handleSubmitEmail = async (values: PassForgotBodyType) => {
    setLoading(true)
    try {
      const res = await authApiRequest.passForgot(values)
      toast.success(res.payload.message, {
        description: 'Mã OTP đã được gửi về email của bạn'
      })
      setEmail(values.email)
      setStep('resetPass')
    } catch (error) {
      toast.error('Email không hợp lệ hoặc không tồn tại')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmitReset = async (values: PassResetFormType) => {
    if (values.password !== values.confirmPassword) {
      toast.error('Mật khẩu xác nhận không khớp')
      return
    }

    setLoading(true)
    try {
      await authApiRequest.newPass({
        email,
        otp: values.otp,
        password: values.password
      })
      toast.success('Mật khẩu đã được đặt lại thành công')
      router.push('/login')
    } catch (error) {
      toast.error('OTP không đúng hoặc đã hết hạn')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {step === 'enterEmail' ? (
        <Form {...emailForm} key='enterEmail'>
          <form
            onSubmit={emailForm.handleSubmit(handleSubmitEmail)}
            className='space-y-4'>
            <FormField
              control={emailForm.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      className='uppercase italic font-light text-black bg-[#f8edd8] rounded-3xl px-8 py-7 border-none placeholder:text-black'
                      placeholder='NHẬP EMAIL dùng để đăng ký'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='text-center w-full my-6'>
              <ButtonSubmit
                title={loading ? 'Đang gửi...' : 'Yêu cầu đổi mật khẩu'}
                disabled={loading}
              />
            </div>
            <div className='text-center'>
              <Link href='/login' className='italic underline uppercase'>
                đã nhớ ra mật khẩu?
              </Link>
            </div>
          </form>
        </Form>
      ) : (
        <Form {...resetForm} key='resetPass'>
          <form
            onSubmit={resetForm.handleSubmit(handleSubmitReset)}
            className='space-y-4'>
            <FormField
              control={resetForm.control}
              name='otp'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      className='bg-[#f8edd8] px-8 py-6 rounded-3xl'
                      placeholder='Nhập mã OTP'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={resetForm.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type='password'
                      className='bg-[#f8edd8] px-8 py-6 rounded-3xl'
                      placeholder='Mật khẩu mới'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={resetForm.control}
              name='confirmPassword'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type='password'
                      className='bg-[#f8edd8] px-8 py-6 rounded-3xl'
                      placeholder='Nhập lại mật khẩu mới'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='text-center w-full my-6'>
              <ButtonSubmit
                title={
                  loading ? 'Đang đổi mật khẩu...' : 'Xác nhận đổi mật khẩu'
                }
                disabled={loading}
              />
            </div>
          </form>
        </Form>
      )}
    </div>
  )
}

export default PasswordResetForm
