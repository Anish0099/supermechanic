import { useQuery } from '@tanstack/react-query';

type TrackingJob = {
    id: string;
    service: string;
    eta: string;
    status: string;
    mechanicId?: string;
    supportPhone: string;
    timeline: Array<{ title: string; note: string; active: boolean }>;
};

const fetchTrackingJob = async (): Promise<TrackingJob> => {
    const response = await fetch('/api/tracking', { cache: 'no-store' });

    if (!response.ok) {
        throw new Error('Failed to fetch tracking data');
    }

    return response.json();
};

export const useJobTracking = () => {
    return useQuery({
        queryKey: ['tracking-job'],
        queryFn: fetchTrackingJob,
        refetchInterval: 10000,
    });
};
