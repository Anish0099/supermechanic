import { Router } from 'express';
import { findNearbyMechanics, upsertMechanicLocation } from './matching.controller';

const router = Router();

router.post('/mechanics/location', upsertMechanicLocation);
router.get('/mechanics/nearby', findNearbyMechanics);

export default router;
