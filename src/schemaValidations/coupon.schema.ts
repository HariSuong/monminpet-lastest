import z from 'zod'

export const CouponCheckRequest = z.object({
  code: z.string().min(1, 'Mã giảm giá không được để trống'), // Mã giảm giá
  total: z.number().min(1, 'Tổng giá trị đơn hàng phải lớn hơn 0') // Tổng giá trị đơn hàng
})

export const CouponCheckResponse = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.object({
    code: z.string(),
    discount: z.number(),
    type: z.number(),
    discount_amount: z.string(),
    reached_price: z.number(),
    final_price: z.string(),
    text: z.string()
  })
})

export type CouponCheckRequestType = z.TypeOf<typeof CouponCheckRequest>
export type CouponCheckResponseType = z.TypeOf<typeof CouponCheckResponse>
