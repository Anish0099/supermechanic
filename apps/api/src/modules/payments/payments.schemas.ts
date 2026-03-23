import { z } from 'zod';

export const PaymentSchema = z.object({
  id: z.string().optional(),
  jobId: z.string(),
  customerId: z.string().optional(),
  amount: z.number().positive(),
  currency: z.string().optional(),
  status: z.enum(['PENDING', 'SUCCEEDED', 'FAILED']).optional(),
  intentId: z.string().optional(),
  provider: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const CreatePaymentSchema = PaymentSchema.omit({ id: true, createdAt: true, updatedAt: true });
export const UpdatePaymentSchema = PaymentSchema.partial();

export type CreatePaymentDto = z.infer<typeof CreatePaymentSchema>;
export type UpdatePaymentDto = z.infer<typeof UpdatePaymentSchema>;