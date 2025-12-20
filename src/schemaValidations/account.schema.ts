import {
  ProductGiftSchema,
  ProductInvoiceSchema
} from '@/schemaValidations/product.schema'
import z from 'zod'

export const AccountRes = z
  .object({
    data: z.object({
      email: z.string(),
      phone: z.string(),
      full_name: z.string(),
      address: z.string(),
      province: z.string()
    }),
    message: z.string()
  })
  .strict()

export type AccountResType = z.TypeOf<typeof AccountRes>

export const AccountGiftRes = z
  .object({
    data: z.object({
      products: z.array(ProductGiftSchema),
      totalBalance: z.number()
    }),
    message: z.string(),
    success: z.boolean() // Success flag indicating the status of the request
  })
  .strict()

export type AccountGiftResType = z.TypeOf<typeof AccountGiftRes>

export const AccountInvoicesRes = z
  .object({
    data: z.object({
      products: z.array(ProductInvoiceSchema),
      totalBalance: z.number()
    }),
    message: z.string(),
    success: z.boolean() // Success flag indicating the status of the request
  })
  .strict()

export type AccountInvoicesResType = z.TypeOf<typeof AccountRes>

export const UpdateMeBody = z.object({
  full_name: z
    .string()
    .trim()
    .min(1, 'Họ và Tên không được để trống')
    .min(2, 'Tên ít nhất có 2 chữ')
    .max(256, 'Tên tối đa 256 ký tự'),

  address: z
    .string()
    .trim()
    .min(1, 'Địa chỉ không được để trống')
    .min(2, 'Địa chỉ ít nhất có 2 chữ')
    .max(256, 'Địa chỉ tối đa 256 ký tự'),

  province: z
    .string()
    .trim()
    .min(1, 'Tỉnh/Thành phố không được để trống')
    .min(2, 'Tỉnh/Thành phố ít nhất có 2 chữ')
    .max(256, 'Tỉnh/Thành phố tối đa 256 ký tự'),

  phone: z
    .string()
    .trim()
    .min(1, 'Số điện thoại không được để trống')
    .regex(
      /^0\d{9}$/,
      'Số điện thoại không hợp lệ (phải bắt đầu bằng 0 và có 10 chữ số)'
    )
})

export type UpdateMeBodyType = z.infer<typeof UpdateMeBody>

export const UpdateMeResponse = z.object({
  message: z.string(), // Chuỗi thông báo trả về
  success: z.boolean(), // Trạng thái thành công hay thất bại
  data: z.object({
    first_name: z.string(),
    last_name: z.string(),
    address: z.string(),
    province: z.string(),
    phone: z
      .string()
      .regex(
        /^0\d{9}$/,
        'Số điện thoại không hợp lệ (phải bắt đầu bằng 0 và có 10 chữ số)'
      )
  })
})

// ✅ Tạo TypeScript type từ schema
export type UpdateMeResponseType = z.infer<typeof UpdateMeResponse>
