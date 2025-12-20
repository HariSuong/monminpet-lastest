import z from 'zod'

export const MessageRes = z
  .object({
    success: z.boolean(),
    message: z.string(),

    data: z.object({})
  })
  .strict()

export type MessageResType = z.TypeOf<typeof MessageRes>
