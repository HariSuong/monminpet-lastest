'use client'

// src/components/ContactForm.tsx
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from './ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form'
import { Input } from './ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from './ui/select'

import contactSchema from '@/schemaValidations/contact.schema'
import serviceApiRequest from '@/services/apiServices'
import { ServicesCat } from '@/types/services'
import { SelectIcon } from '@radix-ui/react-select'
import Image from 'next/image'
import { toast, Toaster } from 'sonner'
import { DatePickerDemo } from './custom-date-input'
import { Textarea } from './ui/textarea'
import Title from '@/components/title'

interface Option {
  value: string
  label: string
}
const petOptions: Option[] = [
  { value: 'cho', label: 'Chó' },
  { value: 'meo', label: 'Mèo' }
]

const ContactForm: React.FC<{ services: ServicesCat[] }> = ({ services }) => {
  const [loading, setLoading] = useState(false)

  const form = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      full_name: '',
      email: '',
      phone: '',
      pet: '',
      service: '',
      message: '',
      appointment_at: ''
    }
  })

  const serviceOptions = services.map(({ name, id }) => ({
    value: String(id),
    label: name
  }))

  const onSubmit = async (data: z.infer<typeof contactSchema>) => {
    setLoading(true)

    console.log('data', data)
    const contactBody = {
      service: data.service || '',
      pet: data.pet || '',
      full_name: data.full_name || '',
      phone: data.phone || '',
      email: data.email || '',
      appointment_at: data.appointment_at || '',
      message: data.message || ''
    }

    console.log('contactBody', contactBody)

    try {
      const response = await serviceApiRequest.submitMessage(contactBody)

      console.log('response', response)
      // Xử lý kết quả trả về
      if (response.payload?.success) {
        toast.success(response.payload?.success)

        form.reset() // Reset form sau khi submit thành công
      } else {
        toast.error('Có lỗi xảy ra khi gửi liên lạc.')
      }
    } catch (error) {
      toast.error('Đã có lỗi xảy ra khi gửi liên lạc.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} id='booking-form'>
          <div className='flex items-center justify-center p-4 relative'>
            <Image
              width={240}
              height={240}
              src='/icon/1.png'
              alt='Icon Chó'
              className='absolute -top-4 right-0 w-1/6 z-0'
            />
            <Image
              width={240}
              height={240}
              src='/icon/2.png'
              alt='Icon Mèo'
              className='absolute bottom-0 left-0 w-1/6 z-0'
            />
            <div className='md:p-8 p-0 max-w-screen-lg w-full mx-auto z-10'>
              <Title title='BOOKING NOW!' subtitle='ĐẶT LỊCH HẸN' />

              {/* <h2 className='text-2xl font-light'>ĐẶT LỊCH HẸN</h2>
              <h3 className='text-4xl font-semibold mb-6'>BOOKING NOW!</h3> */}
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 uppercase'>
                <FormField
                  control={form.control}
                  name='service'
                  render={({ field }) => (
                    <FormItem>
                      <Select onValueChange={field.onChange}>
                        <FormControl className='bg-[#F8EDD8] py-8 pl-6 md:text-base text-sm italic font-light rounded-full uppercase'>
                          <SelectTrigger className='relative'>
                            <SelectValue placeholder='Chọn chuyên khoa *' />
                            <SelectIcon asChild>
                              <Image
                                width={20}
                                height={20}
                                src='/icon/icon-dropdown.png'
                                alt='Dropdown Icon'
                                className='absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none'
                              />
                            </SelectIcon>
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className='bg-[#F8EDD8]'>
                          {serviceOptions.map(option => (
                            <SelectItem key={option.value} value={option.label}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='pet'
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}>
                        <FormControl className='bg-[#F8EDD8] py-8 pl-6 md:text-base text-sm italic font-light rounded-full uppercase'>
                          <SelectTrigger className='relative'>
                            <SelectValue placeholder='Chọn thú nuôi *' />
                            <SelectIcon asChild>
                              <Image
                                width={20}
                                height={20}
                                src='/icon/icon-dropdown.png'
                                alt='Dropdown Icon'
                                className='absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none'
                              />
                            </SelectIcon>
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className='bg-[#F8EDD8]'>
                          {petOptions.map(option => (
                            <SelectItem key={option.value} value={option.label}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
                <FormField
                  control={form.control}
                  name='full_name'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl className='bg-[#F8EDD8] py-8 pl-6 md:text-base text-sm italic font-light rounded-full uppercase'>
                        <Input
                          placeholder='Tên'
                          className='placeholder:text-black'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl className='bg-[#F8EDD8] py-8 pl-6 md:text-base text-sm italic font-light rounded-full uppercase'>
                        <Input
                          type='text'
                          placeholder='Email'
                          className='placeholder:text-black'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
                <FormField
                  control={form.control}
                  name='phone'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl className='bg-[#F8EDD8] py-8 pl-6 md:text-base text-sm italic font-light rounded-full uppercase'>
                        <Input
                          type='tel'
                          className='placeholder:text-black'
                          placeholder='Số điện thoại'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='appointment_at'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl className='bg-[#F8EDD8] py-8 pl-6 md:text-base text-sm italic font-light rounded-full uppercase'>
                        {/* <Input
                          type='date'
                          placeholder='Ngày - Giờ đặt lịch'
                          className='placeholder:text-black'
                          {...field}
                        /> */}
                        <Controller
                          control={form.control}
                          name='appointment_at'
                          render={({ field }) => (
                            <DatePickerDemo
                              value={field.value}
                              onChange={date => {
                                field.onChange(date ? date.toISOString() : '')
                              }}
                            />
                          )}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className='mb-4'>
                <FormField
                  control={form.control}
                  name='message'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl className='bg-[#F8EDD8] py-8 pl-6 md:text-base text-sm italic font-light rounded-2xl uppercase'>
                        <Textarea
                          placeholder='Monminpet có thể giúp gì cho "bé cưng" của bạn? *'
                          className='placeholder:text-black'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className='text-center'>
                <Button
                  type='submit'
                  className='bg-gradient-to-r uppercase from-black to-[#555555] text-white px-4 py-2 rounded-full italic'
                  disabled={loading}>
                  {loading ? 'Đang gửi yêu cầu...' : 'GỬI YÊU CẦU'}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Form>
      <Toaster position='top-right' richColors closeButton />
    </>
  )
}

export default ContactForm
