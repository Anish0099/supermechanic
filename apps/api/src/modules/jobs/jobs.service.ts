import {
    AssignJobDto,
    CreateJobDto,
    JobRecord,
    JobStatus,
    UpdateJobStatusDto,
} from './jobs.schemas';
import JobModel from './jobs.model';

const toRecord = (doc: any): JobRecord => {
    const record = doc.toJSON();
    if (record.location && Array.isArray(record.location.coordinates)) {
        record.location = {
            ...record.location,
            lng: record.location.coordinates[0],
            lat: record.location.coordinates[1],
        };
    }
    return record;
};

export class JobsService {
    async createJob(data: CreateJobDto): Promise<JobRecord> {
        const { location, ...rest } = data;
        const coordinates =
            typeof location?.lng === 'number' && typeof location?.lat === 'number'
                ? [location.lng, location.lat]
                : undefined;

        const job = await JobModel.create({
            ...rest,
            location: {
                address: location.address,
                coordinates,
            },
        });

        return toRecord(job);
    }

    async getJob(id: string): Promise<JobRecord | null> {
        const job = await JobModel.findById(id);
        return job ? toRecord(job) : null;
    }

    async listJobs(customerId?: string): Promise<JobRecord[]> {
        const query = customerId ? { customerId } : {};
        const jobs = await JobModel.find(query).sort({ createdAt: -1 });
        return jobs.map(toRecord);
    }

    async updateJobStatus(
        id: string,
        data: UpdateJobStatusDto,
        updatedBy?: string
    ): Promise<JobRecord | null> {
        const job = await JobModel.findByIdAndUpdate(
            id,
            {
                status: data.status,
                rejectReason: data.reason,
                $push: {
                    auditLog: {
                        status: data.status,
                        note: data.reason,
                        updatedBy,
                        updatedAt: new Date(),
                    },
                },
            },
            { new: true }
        );
        return job ? toRecord(job) : null;
    }

    async assignJob(
        id: string,
        data: AssignJobDto,
        updatedBy?: string
    ): Promise<JobRecord | null> {
        const job = await JobModel.findByIdAndUpdate(
            id,
            {
                mechanicId: data.mechanicId,
                status: 'ASSIGNED',
                $push: {
                    auditLog: {
                        status: 'ASSIGNED',
                        updatedBy,
                        updatedAt: new Date(),
                    },
                },
            },
            { new: true }
        );
        return job ? toRecord(job) : null;
    }

    async cancelJob(id: string, updatedBy?: string): Promise<JobRecord | null> {
        return this.updateJobStatus(id, { status: 'CANCELLED' }, updatedBy);
    }

    async markTimeout(id: string, updatedBy?: string): Promise<JobRecord | null> {
        return this.updateJobStatus(id, { status: 'TIMEOUT' }, updatedBy);
    }

    async completeJob(id: string, updatedBy?: string): Promise<JobRecord | null> {
        return this.updateJobStatus(id, { status: 'COMPLETED' }, updatedBy);
    }
}

export const isValidStatus = (status: string): status is JobStatus => {
    return [
        'REQUEST_CREATED',
        'SEARCHING_MECHANIC',
        'ASSIGNED',
        'EN_ROUTE',
        'ARRIVED',
        'IN_PROGRESS',
        'COMPLETED',
        'PAYMENT_PENDING',
        'RATING_PENDING',
        'CANCELLED',
        'TIMEOUT',
    ].includes(status);
};
