import z from 'zod'

/**
 * "name" : "a",
        "email" : "a",
        "phone" : "a",
        "address": "a",
        "message": "a"
 */

export const Checkout = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, 'Họ và Tên không được để trống')
      .min(2, 'Tên ít nhất có 2 chữ')
      .max(256, 'Tên tối đa 256 ký tự'),
    email: z.string().email('Email không đúng định dạng'),
    address: z
      .string()
      .trim()
      .min(1, 'Địa chỉ không được để trống')
      .min(2, 'Địa chỉ ít nhất có 2 chữ')
      .max(256, 'Địa chỉ tối đa 256 ký tự'),

    phone: z
      .string()
      .trim()
      .min(1, 'Số điện thoại không được để trống')
      .regex(
        /^0\d{9}$/,
        'Số điện thoại không hợp lệ (phải bắt đầu bằng 0 và có 10 chữ số)'
      ),
    message: z.string()
  })
  .strict()

export type CheckoutType = z.infer<typeof Checkout>

export const CartAttributeOption = z.object({
  id: z.number(),
  product_id: z.number(),
  name: z.string(),
  attribute_id: z.number(),
  image: z.string(),
  price: z.number()
})

export const Attribute = z.object({
  id: z.number(),
  name: z.string(),
  product_attribute: z.array(CartAttributeOption)
})

export const CartItem = z.object({
  id: z.string(),
  image: z.string().optional(),
  name: z.string(),
  price: z.number(),
  quantity: z.number(),
  attributes: z.array(CartAttributeOption),
  availableAttributes: z.array(Attribute).optional(),
  total: z.number()
})

export const CheckoutBody = z.object({
  cart: z.array(CartItem),
  form: z.object({
    name: z.string(),
    email: z.string(),
    address: z.string(),
    phone: z.string(),
    message: z.string()
  }),
  gift: z
    .object({
      id: z.number(),
      point: z.number()
    })
    .optional(),
  code: z.string(),
  fee: z.number()
})

export type CheckoutBodyType = z.infer<typeof CheckoutBody>

export const CheckoutRes = z.object({
  message: z.string(),
  code_payment: z.string(),
  discount: z.number(),
  total: z.string(),
  id: z.number(),
  fee: z.number(),
  amount: z.number(),
  coupon_message: z.string()
})

export type CheckoutResType = z.infer<typeof CheckoutRes>
