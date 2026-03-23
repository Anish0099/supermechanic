import { z } from 'zod';

export const notificationSchema = z.object({
  id: z.string(),
  userId: z.string().min(1),
  message: z.string().min(1),
  type: z.enum(['info', 'warning', 'error']),
  isRead: z.boolean().default(false),
  createdAt: z.date().default(() => new Date()),
});

export const createNotificationSchema = notificationSchema.omit({ id: true, createdAt: true });
export const updateNotificationSchema = notificationSchema.partial();

export type NotificationRecord = z.infer<typeof notificationSchema>;
export type CreateNotificationDto = z.infer<typeof createNotificationSchema>;
export type UpdateNotificationDto = z.infer<typeof updateNotificationSchema>;