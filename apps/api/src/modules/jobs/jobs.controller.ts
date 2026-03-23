import { Request, Response } from 'express';
import { JobsService, isValidStatus } from './jobs.service';
import { MatchingService } from '../matching/matching.service';
import { getSocket } from '../../realtime/socket';
import { AssignJobDto, CreateJobDto, UpdateJobStatusDto } from './jobs.schemas';

const jobsService = new JobsService();
const matchingService = new MatchingService();

export const createJob = async (req: Request, res: Response) => {
    try {
        const payload = req.body as CreateJobDto;
        const auth = (req as any).auth;
        if (auth?.userId) {
            payload.customerId = auth.userId;
        }

        if (!payload?.jobType || !payload?.location?.address) {
            return res.status(400).json({ message: 'jobType and location.address are required' });
        }

        const job = await jobsService.createJob(payload);
        getSocket()?.emit('job_created', job);
        return res.status(201).json(job);
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to create job';
        return res.status(500).json({ message });
    }
};

export const getJob = async (req: Request, res: Response) => {
    try {
        const job = await jobsService.getJob(req.params.id);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }
        const auth = (req as any).auth;
        if (auth?.userId && job.customerId && job.customerId !== auth.userId) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        return res.status(200).json(job);
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to load job';
        return res.status(500).json({ message });
    }
};

export const listJobs = async (req: Request, res: Response) => {
    try {
        const auth = (req as any).auth;
        const queryCustomerId = typeof req.query.customerId === 'string' ? req.query.customerId : undefined;
        const customerId = auth?.userId ?? queryCustomerId;
        return res.status(200).json(await jobsService.listJobs(customerId));
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to list jobs';
        return res.status(500).json({ message });
    }
};

export const updateJobStatus = async (req: Request, res: Response) => {
    try {
        const payload = req.body as UpdateJobStatusDto;
        const auth = (req as any).auth;
        const updatedBy = auth?.userId;

        if (!payload?.status || !isValidStatus(payload.status)) {
            return res.status(400).json({ message: 'Invalid status value' });
        }

        const job = await jobsService.updateJobStatus(req.params.id, payload, updatedBy);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }
        getSocket()?.to(`job:${job.id}`).emit('job_status_update', job);
        return res.status(200).json(job);
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to update job';
        return res.status(500).json({ message });
    }
};

export const assignJob = async (req: Request, res: Response) => {
    try {
        const payload = req.body as AssignJobDto;
        const auth = (req as any).auth;
        if (!payload?.mechanicId) {
            return res.status(400).json({ message: 'mechanicId is required' });
        }
        const job = await jobsService.assignJob(req.params.id, payload, auth?.userId);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }
        getSocket()?.to(`job:${job.id}`).emit('job_assigned', job);
        getSocket()?.to(`mechanic:${payload.mechanicId}`).emit('job_assigned', job);
        return res.status(200).json(job);
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to assign job';
        return res.status(500).json({ message });
    }
};

export const cancelJob = async (req: Request, res: Response) => {
    try {
        const auth = (req as any).auth;
        const job = await jobsService.cancelJob(req.params.id, auth?.userId);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }
        getSocket()?.to(`job:${job.id}`).emit('job_status_update', job);
        return res.status(200).json(job);
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to cancel job';
        return res.status(500).json({ message });
    }
};

export const markTimeout = async (req: Request, res: Response) => {
    try {
        const auth = (req as any).auth;
        const job = await jobsService.markTimeout(req.params.id, auth?.userId);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }
        getSocket()?.to(`job:${job.id}`).emit('job_status_update', job);
        return res.status(200).json(job);
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to mark timeout';
        return res.status(500).json({ message });
    }
};

export const matchJob = async (req: Request, res: Response) => {
    try {
        const auth = (req as any).auth;
        const { lat, lng, radiusKm, autoAssign } = req.body || {};
        let matchLat = lat;
        let matchLng = lng;

        if (typeof matchLat !== 'number' || typeof matchLng !== 'number') {
            const job = await jobsService.getJob(req.params.id);
            const coords = (job as any)?.location?.coordinates;
            if (coords?.length === 2) {
                matchLng = coords[0];
                matchLat = coords[1];
            }
        }

        if (typeof matchLat !== 'number' || typeof matchLng !== 'number') {
            return res.status(400).json({ message: 'lat and lng are required' });
        }

        const job = await jobsService.updateJobStatus(
            req.params.id,
            { status: 'SEARCHING_MECHANIC' },
            auth?.userId
        );
        if (job) {
            getSocket()?.to(`job:${job.id}`).emit('job_status_update', job);
        }

        const mechanics = await matchingService.findNearbyMechanics({
            lat: matchLat,
            lng: matchLng,
            radiusKm: typeof radiusKm === 'number' ? radiusKm : 5,
            limit: 5,
        });

        if (!mechanics.length) {
            return res.status(200).json({ mechanics, assigned: null });
        }

        if (autoAssign) {
            const assigned = await jobsService.assignJob(req.params.id, {
                mechanicId: mechanics[0].mechanicId,
            }, auth?.userId);
            if (assigned) {
                getSocket()?.to(`job:${assigned.id}`).emit('job_assigned', assigned);
                getSocket()?.to(`mechanic:${mechanics[0].mechanicId}`).emit('job_assigned', assigned);
            }
            return res.status(200).json({ mechanics, assigned });
        }

        return res.status(200).json({ mechanics, assigned: null });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to match job';
        return res.status(500).json({ message });
    }
};
