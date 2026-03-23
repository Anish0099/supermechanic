import { z } from 'zod';

export const AdminCreateSchema = z.object({
  username: z.string().min(3).max(30),
  password: z.string().min(6),
  email: z.string().email(),
});

export const AdminUpdateSchema = z.object({
  username: z.string().min(3).max(30).optional(),
  email: z.string().email().optional(),
});

export const AdminLoginSchema = z.object({
  username: z.string().min(3).max(30),
  password: z.string().min(6),
});

export type AdminCreate = z.infer<typeof AdminCreateSchema>;
export type AdminUpdate = z.infer<typeof AdminUpdateSchema>;
export type AdminLogin = z.infer<typeof AdminLoginSchema>;