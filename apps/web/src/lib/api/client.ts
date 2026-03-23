export type CreateJobPayload = {
    jobType: 'FIXED' | 'INSPECTION' | 'EMERGENCY';
    serviceType?: string;
    problem?: string;
    vehicleType?: string;
    location: {
        address: string;
        lat?: number;
        lng?: number;
    };
    notes?: string;
    priority?: 'STANDARD' | 'EMERGENCY';
    customerId?: string;
};

type CreateJobResponse = {
    id: string;
    status: string;
};

type MatchJobResponse = {
    mechanics: Array<{ mechanicId: string; distanceMeters?: number }>;
    assigned: { id: string; status: string; mechanicId?: string } | null;
};

export type JobSummary = {
    id: string;
    jobType: string;
    serviceType?: string;
    problem?: string;
    status: string;
    createdAt: string;
    price?: number;
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const createJob = async (
    payload: CreateJobPayload,
    token?: string
): Promise<CreateJobResponse> => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!apiUrl) {
        await sleep(500);
        return { id: `TEMP-${Math.floor(Math.random() * 10000)}`, status: 'REQUEST_CREATED' };
    }

    const response = await fetch(`${apiUrl}/jobs`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        throw new Error('Failed to create job');
    }

    return response.json();
};

export const matchJob = async (
    jobId: string,
    payload: { lat?: number; lng?: number },
    token?: string
) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!apiUrl) {
        await sleep(300);
        return { mechanics: [], assigned: null } as MatchJobResponse;
    }

    const response = await fetch(`${apiUrl}/jobs/${jobId}/match`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ ...payload, autoAssign: true }),
    });

    if (!response.ok) {
        throw new Error('Failed to match job');
    }

    return response.json() as Promise<MatchJobResponse>;
};

export const listJobs = async (customerId?: string, token?: string): Promise<JobSummary[]> => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!apiUrl) {
        await sleep(200);
        return [];
    }

    const query = customerId ? `?customerId=${customerId}` : '';
    const response = await fetch(`${apiUrl}/jobs${query}`, {
        cache: 'no-store',
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });

    if (!response.ok) {
        throw new Error('Failed to load jobs');
    }

    return response.json();
};

export const createPaymentIntent = async (
    payload: { amount: number; currency?: string; jobId?: string; customerId?: string },
    token?: string
) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!apiUrl) {
        await sleep(200);
        return { clientSecret: 'mock_secret', intentId: 'mock_intent' };
    }

    const response = await fetch(`${apiUrl}/payments/intent`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        throw new Error('Failed to create payment intent');
    }

    return response.json() as Promise<{ clientSecret: string; intentId: string }>;
};

export const matchJobAdmin = async (
    jobId: string,
    payload: { lat: number; lng: number; radiusKm?: number },
    token?: string
) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!apiUrl) {
        await sleep(200);
        return { mechanics: [], assigned: null };
    }

    const response = await fetch(`${apiUrl}/jobs/${jobId}/match`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ ...payload, autoAssign: false }),
    });

    if (!response.ok) {
        throw new Error('Failed to match job');
    }

    return response.json();
};

export const assignJobAdmin = async (
    jobId: string,
    mechanicId: string,
    token?: string
) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!apiUrl) {
        await sleep(200);
        return { id: jobId, mechanicId };
    }

    const response = await fetch(`${apiUrl}/jobs/${jobId}/assign`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ mechanicId }),
    });

    if (!response.ok) {
        throw new Error('Failed to assign job');
    }

    return response.json();
};

export const assignJobMechanic = async (
    jobId: string,
    mechanicId: string,
    token?: string
) => {
    return assignJobAdmin(jobId, mechanicId, token);
};

export const rejectJobMechanic = async (jobId: string, reason?: string, token?: string) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!apiUrl) {
        await sleep(200);
        return { id: jobId, status: 'CANCELLED', rejectReason: reason };
    }

    const response = await fetch(`${apiUrl}/jobs/${jobId}/status`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ status: 'CANCELLED', reason }),
    });

    if (!response.ok) {
        throw new Error('Failed to reject job');
    }

    return response.json();
};

export const updateJobStatusAdmin = async (
    jobId: string,
    status: string,
    token?: string
) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!apiUrl) {
        await sleep(200);
        return { id: jobId, status };
    }

    const response = await fetch(`${apiUrl}/jobs/${jobId}/status`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ status }),
    });

    if (!response.ok) {
        throw new Error('Failed to update status');
    }

    return response.json();
};

export const updateJobStatusMechanic = async (
    jobId: string,
    status: string,
    token?: string
) => {
    return updateJobStatusAdmin(jobId, status, token);
};

export const markJobTimeout = async (jobId: string, token?: string) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!apiUrl) {
        await sleep(200);
        return { id: jobId, status: 'TIMEOUT' };
    }

    const response = await fetch(`${apiUrl}/jobs/${jobId}/timeout`, {
        method: 'PATCH',
        headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
    });

    if (!response.ok) {
        throw new Error('Failed to mark timeout');
    }

    return response.json();
};
