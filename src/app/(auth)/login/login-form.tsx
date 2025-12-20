'use client'

import ButtonSubmit from '@/app/(auth)/_component/button-submit'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { LoginBody, LoginBodyType } from '@/schemaValidations/auth.schema'
import authApiRequest from '@/services/apiAuth'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast, Toaster } from 'sonner'

const LoginForm = () => {
  const [loading, setLoading] = useState(false) // Thêm state loading
  const searchParams = useSearchParams()

  const redirectPath = searchParams.get('redirect') || '/'

  // console.log('redirectPath', redirectPath)

  const router = useRouter()
  const form = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBody),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  // 2. Define a submit handler.
  async function onSubmit(values: LoginBodyType) {
    setLoading(true) // Bắt đầu loading

    try {
      const result = await authApiRequest.login(values)
      toast.success('Đăng nhập thành công', {
        description: 'Vui lòng đợi chuyển hướng trong giây lát'
      })

      await authApiRequest.auth({ sessionToken: result.payload.token })
      window.location.href = redirectPath
      // setTimeout(() => {
      //   router.push(redirectPath)
      //   // router.refresh()
      //   router.replace(redirectPath)
      // }, 500) // Chờ 500ms trước khi thực hiện push
    } catch (error: any) {
      const status = error.status as number
      if (status === 400) {
        toast.error('Lỗi', {
          description: 'Email hoặc mật khẩu chưa đúng, vui lòng kiểm tra lại'
        })
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-4 max-w-[400px] w-full'>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className='uppercase italic font-light text-black bg-[#f8edd8] rounded-3xl px-8 py-7 border-none placeholder:text-black'
                  placeholder='NHẬP EMAIL của bạn'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type='password'
                  className='uppercase italic font-light text-black bg-[#f8edd8] rounded-3xl px-8 py-7 border-none placeholder:text-black'
                  placeholder='Nhập mật khẩu'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='text-center w-full'>
          <Link href={'/password-reset'} className='italic underline text-xs'>
            Quên mật khẩu?
          </Link>
          <ButtonSubmit
            title={loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
            disabled={loading}
          />

          <p className='italic font-light my-6 text-base'>
            BẠN CHƯA LÀ THÀNH VIÊN CỦA MONMIN PET?
          </p>

          <Link
            href={'/register'}
            className='underline text-lg font-bold uppercase'>
            đăng ký thành viên
          </Link>
        </div>
      </form>
      <Toaster position='top-right' richColors closeButton />
    </Form>
  )
}

export default LoginForm
