import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

type AppRole = 'customer' | 'mechanic' | 'admin';

type RoleResult = {
    userId: string;
    role: AppRole;
};

export const requireRole = async (role: AppRole): Promise<RoleResult> => {
    const user = await currentUser();
    const userId = user?.id;

    if (!userId) {
        redirect('/sign-in');
    }

    const metadataRole = user?.publicMetadata?.role ?? user?.privateMetadata?.role;
    const userRole = (metadataRole ?? 'customer') as AppRole;

    if (userRole !== role) {
        redirect('/customer');
    }

    return { userId, role: userRole };
};
