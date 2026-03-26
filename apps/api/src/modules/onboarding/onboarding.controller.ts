import { Request, Response } from 'express';
import { OnboardingService } from './onboarding.service';
import { OnboardingDto } from './onboarding.schemas';

const onboardingService = new OnboardingService();

export const onboardUser = async (req: Request, res: Response) => {
  try {
    const { role } = req.body as OnboardingDto;

    // clerkUserId is passed from the frontend via x-clerk-user-id header
    const clerkUserId = req.headers['x-clerk-user-id'] as string;

    if (!clerkUserId) {
      return res.status(401).json({ error: 'Missing Clerk user ID' });
    }

    const result = await onboardingService.onboardUser(clerkUserId, role);
    res.status(200).json(result);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Onboarding failed';
    console.error('Onboarding error:', error);
    res.status(500).json({ error: message });
  }
};
