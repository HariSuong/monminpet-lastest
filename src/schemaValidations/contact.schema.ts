import { z } from 'zod'

const contactSchema = z.object({
  service: z.string(),
  // .min(1, { message: 'Chọn chuyên khoa là bắt buộc.' }),
  pet: z.string().min(1, { message: 'Chọn thú nuôi là bắt buộc.' }),
  full_name: z.string().min(1, { message: 'Tên là bắt buộc.' }),
  phone: z
    .string()
    .regex(/^\d{10}$/, { message: 'Số điện thoại phải có 10 chữ số.' }),
  email: z.string().email({ message: 'Email không hợp lệ.' }),
  appointment_at: z.string().optional(),
  message: z.string().min(1, { message: 'Lời nhắn là bắt buộc.' })
})

export default contactSchema
