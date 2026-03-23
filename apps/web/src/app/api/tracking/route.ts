export const dynamic = 'force-dynamic';

type TrackingJob = {
    id: string;
    service: string;
    eta: string;
    status: string;
    supportPhone: string;
    timeline: Array<{ title: string; note: string; active: boolean }>;
};

const mockJob: TrackingJob = {
    id: 'VS-2041',
    service: 'Quick Fix - Battery jumpstart',
    eta: '12-15 minutes',
    status: 'En route',
    supportPhone: '+91 90000 00000',
    timeline: [
        { title: 'Assigned', note: 'Mechanic accepted the request.', active: false },
        { title: 'En route', note: 'Sharing live location updates.', active: true },
        { title: 'Arrived', note: 'Mechanic reaches your location.', active: false },
    ],
};

export async function GET() {
    return Response.json(mockJob);
}
