import z from 'zod'

export const RegisterBody = z
  .object({
    full_name: z.string().trim().min(2, 'Tên phải có ít nhất 2 ký tự').max(256),
    email: z
      .string({
        message: 'Email không được để trống'
      })
      .email('Email không đúng định dạng'),
    password: z
      .string({
        message: 'Mật khẩu không được để trống'
      })
      .min(8, 'Mật khẩu có ít nhất 8 ký tự')
      .max(100)
  })
  .strict()

export type RegisterBodyType = z.TypeOf<typeof RegisterBody>

export const RegisterRes = z.object({
  token: z.string()
})

export type RegisterResType = z.TypeOf<typeof RegisterRes>

export const LoginBody = z
  .object({
    email: z.string().email('Email không đúng định dạng'),
    password: z
      .string()
      // .min(8, 'Mật khẩu có ít nhất 8 ký tự')
      .max(100)
  })
  .strict()

export const PassForgotBody = z
  .object({
    email: z.string().email('Email không đúng định dạng')
  })
  .strict()

export const PassForgotRes = z
  .object({
    message: z.string(),
    otp: z.number()
  })
  .strict()

export const ChangePassBody = z
  .object({
    email: z.string().email('Email không đúng định dạng'),
    password: z
      .string()
      // .min(8, 'Mật khẩu có ít nhất 8 ký tự')
      .max(100),
    otp: z.string(),
    confirmPassword: z
      .string()
      // .min(8, 'Mật khẩu có ít nhất 8 ký tự')
      .max(100)
      .optional()
  })
  .strict()

export const ChangePassRes = z
  .object({
    message: z.string()
  })
  .strict()

export const PassResetForm = z.object({
  password: z
    .string()
    // .min(8, 'Mật khẩu có ít nhất 8 ký tự')
    .max(100),
  confirmPassword: z
    .string()
    // .min(8, 'Mật khẩu có ít nhất 8 ký tự')
    .max(100),
  otp: z.string()
})

export type LoginBodyType = z.TypeOf<typeof LoginBody>
export type PassForgotBodyType = z.TypeOf<typeof PassForgotBody>
export type PassForgotResType = z.TypeOf<typeof PassForgotRes>
export type PassResetFormType = z.TypeOf<typeof PassResetForm>
export type ChangePassBodyType = z.TypeOf<typeof ChangePassBody>
export type ChangePassResType = z.TypeOf<typeof ChangePassRes>

export const LoginRes = RegisterRes

export type LoginResType = z.TypeOf<typeof LoginRes>

export const SlideSessionBody = z.object({}).strict()

export type SlideSessionBodyType = z.TypeOf<typeof SlideSessionBody>
export const SlideSessionRes = RegisterRes

export type SlideSessionResType = z.TypeOf<typeof SlideSessionRes>
