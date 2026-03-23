import { z } from 'zod';

export const ServiceCatalogSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Service name is required'),
  description: z.string().optional(),
  price: z.number().positive('Price must be a positive number'),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const CreateServiceSchema = ServiceCatalogSchema.omit({ id: true, createdAt: true, updatedAt: true });

export const UpdateServiceSchema = ServiceCatalogSchema.partial().omit({ id: true, createdAt: true });

export type CreateServiceDto = z.infer<typeof CreateServiceSchema>;
export type UpdateServiceDto = z.infer<typeof UpdateServiceSchema>;