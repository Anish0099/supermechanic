import { Router, Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { OnboardingSchema } from './onboarding.schemas';
import { onboardUser } from './onboarding.controller';

const router = Router();

const validateOnboarding = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const parsed = OnboardingSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.message });
  }
  req.body = parsed.data;
  return next();
};

// POST /api/onboarding
router.post('/', validateOnboarding, onboardUser);

export default router;
