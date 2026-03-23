import { Router } from 'express';
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';
import PaymentModel from './payments.model';

const router = Router();

router.use(ClerkExpressRequireAuth());

router.get('/', async (req, res) => {
    const auth = (req as any).auth;
    const role = auth?.sessionClaims?.publicMetadata?.role;
    if (role !== 'admin') {
        return res.status(403).json({ message: 'Forbidden' });
    }

    const payments = await PaymentModel.find().sort({ createdAt: -1 });
    return res.status(200).json(payments);
});

export default router;
