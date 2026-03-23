import { CreateNotificationDto, NotificationRecord, UpdateNotificationDto } from './notifications.schemas';

export class NotificationService {
    private notifications: NotificationRecord[] = [];

    async createNotification(data: CreateNotificationDto): Promise<NotificationRecord> {
        const notification: NotificationRecord = {
            id: crypto.randomUUID(),
            userId: data.userId,
            message: data.message,
            type: data.type,
            isRead: data.isRead ?? false,
            createdAt: new Date(),
        };
        this.notifications.push(notification);
        return notification;
    }

    async getNotifications(): Promise<NotificationRecord[]> {
        return this.notifications;
    }

    async getNotificationById(id: string): Promise<NotificationRecord | null> {
        return this.notifications.find((notification) => notification.id === id) ?? null;
    }

    async updateNotification(id: string, data: UpdateNotificationDto): Promise<NotificationRecord | null> {
        const index = this.notifications.findIndex((notification) => notification.id === id);
        if (index === -1) {
            return null;
        }
        this.notifications[index] = {
            ...this.notifications[index],
            ...data,
        };
        return this.notifications[index];
    }

    async deleteNotification(id: string): Promise<boolean> {
        const index = this.notifications.findIndex((notification) => notification.id === id);
        if (index === -1) {
            return false;
        }
        this.notifications.splice(index, 1);
        return true;
    }
}