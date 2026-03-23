import { Router } from 'express';
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';
import {
    assignJob,
    cancelJob,
    createJob,
    getJob,
    listJobs,
    matchJob,
    markTimeout,
    updateJobStatus,
} from './jobs.controller';

const router = Router();

router.use(ClerkExpressRequireAuth());

router.post('/', createJob);
router.get('/', listJobs);
router.get('/:id', getJob);
router.patch('/:id/status', updateJobStatus);
router.patch('/:id/assign', assignJob);
router.patch('/:id/cancel', cancelJob);
router.patch('/:id/timeout', markTimeout);
router.post('/:id/match', matchJob);

export default router;
