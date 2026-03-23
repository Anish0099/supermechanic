import { Router } from 'express';
import { 
    createNotification, 
    getNotifications, 
    getNotificationById, 
    updateNotification, 
    deleteNotification 
} from './notifications.controller';

const router = Router();

router.post('/', createNotification);
router.get('/', getNotifications);
router.get('/:id', getNotificationById);
router.put('/:id', updateNotification);
router.delete('/:id', deleteNotification);

export default router;