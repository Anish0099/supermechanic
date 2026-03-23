import { z } from 'zod';

export const reviewSchema = z.object({
  id: z.string().optional(),
  bookingId: z.string(),
  rating: z.number().min(1).max(5),
  comment: z.string().max(500).optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const createReviewSchema = reviewSchema.omit({ id: true, createdAt: true, updatedAt: true });
export const updateReviewSchema = reviewSchema.partial().omit({ bookingId: true });

export type CreateReviewDto = z.infer<typeof createReviewSchema>;
export type UpdateReviewDto = z.infer<typeof updateReviewSchema>;