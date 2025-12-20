import z from 'zod'
import { CartItem as CheckoutCartItem } from './checkout.schema' // Import CartItem từ checkout schema

// Define Product schema
export const Product = z.object({
  product_id: z.number(),
  name: z.string(),
  price: z.number(),
  thumb: z.string(),
  quantity: z.number(),
  rating: z.number(),
  content: z.string().nullable()
})

// Define Invoice schema
export const Invoice = z.object({
  id: z.number(),
  total: z.number(),
  amount: z.number(),
  name: z.string(),
  phone: z.string(),
  address: z.string(),
  method: z.number(),

  received_at: z.string().nullable(),
  created_at: z.string(),
  paid: z.number(),
  fee: z.number(),
  discount: z.number(),
  products: z.array(Product),
  json_invoices: z.array(CheckoutCartItem).optional() // Sử dụng CheckoutCartItem
})

// Define Invoices schema
export const Invoices = z
  .object({
    id: z.number(),
    total: z.string(),
    json_invoices: z.string().nullable(), // JSON string
    products: z
      .array(
        z.object({
          product_id: z.number(),
          name: z.string(),
          price: z.number(),
          thumb: z.string(),
          quantity: z.number(),
          content: z.string().nullable()
        })
      )
      .optional(), // Optional array of products
    rating: z.number(),
    quantity: z.number()
  })
  .nullable() // Nullable array of products

// Define Paginated response schema for invoices
export const InvoicesResponse = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.object({
    current_page: z.number(),
    data: z.array(Invoices),
    first_page_url: z.string(),
    last_page: z.number(),
    last_page_url: z.string(),
    links: z.array(
      z.object({
        url: z.string().nullable(),
        label: z.string(),
        active: z.boolean()
      })
    ),
    next_page_url: z.string().nullable(),
    path: z.string(),
    per_page: z.number(),
    prev_page_url: z.string().nullable(),
    to: z.number(),
    total: z.number()
  })
})

export const InvoiceDetailResponse = z.object({
  success: z.boolean(),
  message: z.string(),
  data: Invoice
})

// Define the type for the InvoiceDetailResponse
export type InvoiceDetailResponseType = z.infer<typeof InvoiceDetailResponse>

export type InvoiceType = z.infer<typeof Invoice>

export type InvoicesResponseType = z.infer<typeof InvoicesResponse>
