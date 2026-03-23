import { z } from 'zod';

export const quoteSchema = z.object({
  id: z.string().optional(),
  customerId: z.string(),
  mechanicId: z.string(),
  serviceId: z.string(),
  estimatedCost: z.number().positive(),
  status: z.enum(['PENDING', 'ACCEPTED', 'REJECTED']),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const createQuoteSchema = quoteSchema.omit({ id: true, createdAt: true, updatedAt: true });
export const updateQuoteSchema = quoteSchema.partial().omit({ createdAt: true });

export const QuoteSchema = createQuoteSchema;

export type CreateQuoteDto = z.infer<typeof createQuoteSchema>;
export type UpdateQuoteDto = z.infer<typeof updateQuoteSchema>;