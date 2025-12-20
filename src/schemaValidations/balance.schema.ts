import z from 'zod'

// Define the balance information schema
export const Balance = z.object({
  unit: z.string(), // The unit of the balance (e.g., POINT, VND)
  total_balance: z.number() // The total balance in the respective unit
})

// Define the response schema for balance
export const GetBalanceResponse = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.array(Balance) // Array of balances
})

export type GetBalanceResponseType = z.infer<typeof GetBalanceResponse>
