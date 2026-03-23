import { Request, Response } from 'express';
import { NotificationService } from './notifications.service';
import { CreateNotificationDto, UpdateNotificationDto } from './notifications.schemas';

export class NotificationsController {
    private notificationService: NotificationService;

    constructor() {
        this.notificationService = new NotificationService();
    }

    public async createNotification(req: Request, res: Response): Promise<Response> {
        try {
            const notificationData: CreateNotificationDto = req.body;
            const notification = await this.notificationService.createNotification(notificationData);
            return res.status(201).json(notification);
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to create notification';
            return res.status(500).json({ message });
        }
    }

    public async getNotifications(req: Request, res: Response): Promise<Response> {
        try {
            const notifications = await this.notificationService.getNotifications();
            return res.status(200).json(notifications);
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to load notifications';
            return res.status(500).json({ message });
        }
    }

    public async getNotificationById(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const notification = await this.notificationService.getNotificationById(id);
            if (!notification) {
                return res.status(404).json({ message: 'Notification not found' });
            }
            return res.status(200).json(notification);
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to load notification';
            return res.status(500).json({ message });
        }
    }

    public async updateNotification(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const notificationData: UpdateNotificationDto = req.body;
            const notification = await this.notificationService.updateNotification(id, notificationData);
            if (!notification) {
                return res.status(404).json({ message: 'Notification not found' });
            }
            return res.status(200).json(notification);
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to update notification';
            return res.status(500).json({ message });
        }
    }

    public async deleteNotification(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const deleted = await this.notificationService.deleteNotification(id);
            if (!deleted) {
                return res.status(404).json({ message: 'Notification not found' });
            }
            return res.status(204).send();
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to delete notification';
            return res.status(500).json({ message });
        }
    }
}

const notificationsController = new NotificationsController();

export const createNotification = (req: Request, res: Response) =>
    notificationsController.createNotification(req, res);
export const getNotifications = (req: Request, res: Response) =>
    notificationsController.getNotifications(req, res);
export const getNotificationById = (req: Request, res: Response) =>
    notificationsController.getNotificationById(req, res);
export const updateNotification = (req: Request, res: Response) =>
    notificationsController.updateNotification(req, res);
export const deleteNotification = (req: Request, res: Response) =>
    notificationsController.deleteNotification(req, res);