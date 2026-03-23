import { useMutation } from '@tanstack/react-query';
import { createJob, CreateJobPayload, matchJob } from '../api/client';
import { useAuth, useUser } from '@clerk/nextjs';

export const useCreateJob = () => {
    const { user } = useUser();
    const { getToken } = useAuth();

    return useMutation({
        mutationFn: async (payload: CreateJobPayload) => {
            const token = await getToken();
            const job = await createJob({
                ...payload,
                customerId: user?.id,
            }, token ?? undefined);
            await matchJob(job.id, { lat: payload.location.lat, lng: payload.location.lng }, token ?? undefined);
            return job;
        },
    });
};
