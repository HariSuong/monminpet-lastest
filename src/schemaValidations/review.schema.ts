import z from 'zod'

export const Reviews = z.object({
  id: z.number(),
  thumb: z.string().url(), // assuming this is a valid URL string
  price: z.number(),
  name: z.string()
})

export const ReviewsRes = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.array(Reviews)
})

export type ReviewsResType = z.TypeOf<typeof ReviewsRes>

// Define the schema for a single review
export const Review = z.object({
  id: z.number(),
  content: z.string(),
  rating: z.number().min(1).max(5) // Ensure rating is between 1 and 5
})

// Define the schema for multiple reviews (an array of Review objects)
export const ReviewForm = z.object({
  reviews: z.array(Review) // Now it's an array of reviews
})

export const ContentReview = z.object({
  content: z.string(),
  id: z.string()
})

export type ReviewFormType = z.TypeOf<typeof ReviewForm>
export type ReviewResType = z.TypeOf<typeof Review>
export type ContentReviewType = z.TypeOf<typeof ContentReview>
