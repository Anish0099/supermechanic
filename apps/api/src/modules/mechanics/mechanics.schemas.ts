import { z } from 'zod';

export const mechanicSchema = z.object({
  id: z.string().optional(),
  userId: z.string().min(1, 'User ID is required'),
  specialization: z.string().min(1, 'Specialization is required'),
  experience: z.number().min(0, 'Experience must be a non-negative number'),
});

export const createMechanicSchema = mechanicSchema.omit({ id: true });
export const updateMechanicSchema = mechanicSchema.partial();

export type CreateMechanicDto = z.infer<typeof createMechanicSchema>;
export type UpdateMechanicDto = z.infer<typeof updateMechanicSchema>;