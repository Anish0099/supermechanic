import { z } from 'zod';

export const OnboardingSchema = z.object({
  role: z.enum(['customer', 'mechanic']),
});

export type OnboardingDto = z.infer<typeof OnboardingSchema>;
