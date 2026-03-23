import { z } from 'zod';

export const BookingSchema = z.object({
  id: z.string().optional(),
  customerId: z.string(),
  mechanicId: z.string(),
  serviceId: z.string(),
  date: z.coerce.date(),
  status: z.enum(['PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELED']),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type Booking = z.infer<typeof BookingSchema>;
export type CreateBookingDto = Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateBookingDto = Partial<CreateBookingDto>;