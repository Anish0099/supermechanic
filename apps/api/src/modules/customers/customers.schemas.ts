import { z } from 'zod';

export const createCustomerSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  address: z.string().min(1, 'Address is required'),
});

export const updateCustomerSchema = z.object({
  phone: z.string().min(10, 'Phone number must be at least 10 digits').optional(),
  address: z.string().optional(),
});

export const customerIdSchema = z.object({
  id: z.string().min(1, 'Invalid customer ID'),
});

export type CreateCustomerDto = z.infer<typeof createCustomerSchema>;
export type UpdateCustomerDto = z.infer<typeof updateCustomerSchema>;