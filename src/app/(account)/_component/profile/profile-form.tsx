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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import {
  AccountResType,
  UpdateMeBody,
  UpdateMeBodyType
} from '@/schemaValidations/account.schema'
import accountApiRequest from '@/services/apiAccount'

import { zodResolver } from '@hookform/resolvers/zod'
import { SelectIcon } from '@radix-ui/react-select'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast, Toaster } from 'sonner'
import { provinces } from '../../../../../public/data/provinces'

interface Profile {
  profile: AccountResType['data']
  sessionToken: string
}
const ProfileForm: React.FC<Profile> = ({ profile, sessionToken }) => {
  // console.log('profile', profile)
  const router = useRouter()
  const form = useForm<UpdateMeBodyType>({
    resolver: zodResolver(UpdateMeBody),
    defaultValues: {
      full_name: profile.full_name,
      address: profile.address,
      province: profile.province,
      phone: profile.phone
    }
  })

  // 2. Define a submit handler.
  async function onSubmit(values: UpdateMeBodyType) {
    try {
      // console.log('values', values)
      // Gọi API route từ Next.js để gửi yêu cầu update profile
      // const result = await accountApiRequest.updateAccountFromClientToNextServer(values)

      const result = await accountApiRequest.updateAccount(values, sessionToken)

      toast.success('Lưu thành công', {
        description: 'Chúng tôi đã cập nhật địa chỉ giao hàng của bạn'
      })
      // console.log('result form update', result)
      // router.prefetch('/account')
      router.push('/account') // Instead of prefetching, we push to refresh the profile page
    } catch (error: any) {
      // console.log('error', error.status)
      // const errors = error.payload.errors as { email: string }

      const status = error.status as number
      if (status === 400) {
        toast.error('Lỗi', {
          description: 'Email hoặc mật khẩu chưa đúng, vui lòng kiểm tra lại'
        })
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-4 w-full flex flex-col items-center'>
        <div className='w-full md:max-w-5xl'>
          <div className='md:flex md:gap-4'>
            <div className='md:w-1/2 space-y-6 md:space-y-0 w-full'>
              {/* Họ */}
              <FormField
                control={form.control}
                name='full_name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='uppercase italic font-light'>
                      Họ và Tên
                    </FormLabel>
                    <FormControl>
                      <Input
                        className='uppercase italic font-light text-black bg-[#f8edd8] rounded-3xl px-8 py-7 border-none placeholder:text-black'
                        placeholder='họ và tên *'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Số điện thoại */}
              <FormField
                control={form.control}
                name='phone'
                render={({ field }) => (
                  <FormItem className='!md:mt-3 !mt-6'>
                    <FormLabel className='uppercase italic font-light'>
                      Số điện thoại
                    </FormLabel>
                    <FormControl>
                      <Input
                        className='uppercase italic font-light text-black bg-[#f8edd8] rounded-3xl px-8 py-7 border-none placeholder:text-black'
                        placeholder='số điện thoại *'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='md:w-1/2 md:mt-0 mt-8 w-full'>
              {/* Địa chỉ */}
              <FormField
                control={form.control}
                name='address'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='uppercase italic font-light'>
                      Địa chỉ
                    </FormLabel>
                    <FormControl>
                      <Input
                        className='uppercase italic font-light text-black bg-[#f8edd8] rounded-3xl px-8 py-7 border-none placeholder:text-black'
                        placeholder='địa chỉ giao hàng *'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Tỉnh/Thành phố */}
              <FormField
                control={form.control}
                name='province'
                render={({ field }) => (
                  <FormItem className='!md:mt-3 !mt-6'>
                    <FormLabel className='uppercase italic font-light'>
                      Tỉnh / Thành phố
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}>
                      <FormControl className='bg-[#F8EDD8] px-8 py-7 text-base italic font-light rounded-full uppercase border-none'>
                        <SelectTrigger className='relative'>
                          <SelectValue placeholder='HỒ CHÍ MINH' />
                          <SelectIcon asChild>
                            <Image
                              width={20}
                              height={20}
                              src='/icon/icon-dropdown.png'
                              alt='Dropdown Icon'
                              className='absolute right-8 top-1/2 transform -translate-y-1/2 pointer-events-none'
                            />
                          </SelectIcon>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className='bg-[#F8EDD8]'>
                        {provinces.map(option => {
                          const cleanedProvinceName = option.name.replace(
                            /^(Tỉnh|Thành phố)\s*/,
                            ''
                          ) // Remove the prefix

                          return (
                            <SelectItem key={option.code} value={option.name}>
                              {cleanedProvinceName}
                            </SelectItem>
                          )
                        })}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className='w-full flex flex-col md:justify-end md:items-end mt-6'>
            {/* <CheckboxProfile /> */}

            <div className='md:flex items-center gap-4 mt-6'>
              {/* <Button
                type='button'
                className='bg-gradient-to-r from-[#fafafa] via-[#cccccc] to-[#a2a2a2] px-1 md:p-6 py-5 text-center text-xs text-black md:text-lg italic font-semibold uppercase mt-4'>
                Chỉnh sửa
              </Button> */}
              <ButtonSubmit title='Lưu' />
            </div>
          </div>
        </div>
      </form>
      <Toaster position='top-right' richColors closeButton />
    </Form>
  )
}

export default ProfileForm
