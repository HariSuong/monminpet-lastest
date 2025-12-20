import z from 'zod'

// Define the Transaction schema
export const Transaction = z.object({
  id: z.number(),
  amount: z.number(),
  unit: z.string(),
  status: z.string(),
  created_at: z.string()
})

// Define Paginated response schema for transactions
export const TransactionsResponse = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.object({
    current_page: z.number(),
    data: z.array(Transaction),
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

export type TransactionsResponseType = z.infer<typeof TransactionsResponse>
