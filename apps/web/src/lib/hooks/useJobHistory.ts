import { useQuery } from '@tanstack/react-query';
import { listJobs } from '../api/client';
import { useAuth, useUser } from '@clerk/nextjs';

export const useJobHistory = () => {
    const { user } = useUser();
    const { getToken } = useAuth();

    return useQuery({
        queryKey: ['job-history'],
        queryFn: async () => {
            const token = await getToken();
            return listJobs(user?.id, token ?? undefined);
        },
    });
};
