import { z } from 'zod';

export const vehicleSchema = z.object({
  id: z.string().optional(),
  customerId: z.string().min(1, 'Customer ID is required'),
  make: z.string().min(1, 'Make is required'),
  model: z.string().min(1, 'Model is required'),
  year: z.number().min(1886, 'Year must be a valid year').max(new Date().getFullYear(), 'Year cannot be in the future'),
});

export const createVehicleSchema = vehicleSchema.omit({ id: true }).required();

export const updateVehicleSchema = vehicleSchema.partial();

export type CreateVehicleDto = z.infer<typeof createVehicleSchema>;
export type UpdateVehicleDto = z.infer<typeof updateVehicleSchema>;