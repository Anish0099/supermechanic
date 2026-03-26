import prisma from '../../db/prisma';
import { createClerkClient } from '@clerk/clerk-sdk-node';

const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY!,
});

export class OnboardingService {
  /**
   * Onboard a user: create User + Customer/Mechanic profile in Prisma,
   * then set the role in Clerk publicMetadata.
   */
  async onboardUser(clerkUserId: string, role: 'customer' | 'mechanic') {
    // 1. Fetch Clerk user details
    const clerkUser = await clerkClient.users.getUser(clerkUserId);
    const email =
      clerkUser.emailAddresses.find(
        (e) => e.id === clerkUser.primaryEmailAddressId,
      )?.emailAddress ?? '';
    const name =
      [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(' ') ||
      'User';

    // 2. Upsert User in Prisma (by clerkId stored in email for now)
    const prismaRole = role.toUpperCase() as 'CUSTOMER' | 'MECHANIC';

    let user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      user = await prisma.user.create({
        data: {
          name,
          email,
          password: '', // Clerk handles auth, no password needed
          role: prismaRole,
        },
      });
    } else {
      user = await prisma.user.update({
        where: { email },
        data: { role: prismaRole },
      });
    }

    // 3. Create role-specific profile
    if (role === 'customer') {
      const existing = await prisma.customer.findUnique({
        where: { userId: user.id },
      });
      if (!existing) {
        await prisma.customer.create({
          data: {
            userId: user.id,
            phone: '',
            address: '',
          },
        });
      }
    } else {
      const existing = await prisma.mechanic.findUnique({
        where: { userId: user.id },
      });
      if (!existing) {
        await prisma.mechanic.create({
          data: {
            userId: user.id,
            specialization: 'General',
            experience: 0,
          },
        });
      }
    }

    // 4. Update Clerk publicMetadata with the role
    await clerkClient.users.updateUserMetadata(clerkUserId, {
      publicMetadata: { role },
    });

    return { userId: user.id, role };
  }
}
