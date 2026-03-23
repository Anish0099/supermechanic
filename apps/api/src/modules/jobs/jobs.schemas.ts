export type JobType = 'FIXED' | 'INSPECTION' | 'EMERGENCY';

export type JobStatus =
    | 'REQUEST_CREATED'
    | 'SEARCHING_MECHANIC'
    | 'ASSIGNED'
    | 'EN_ROUTE'
    | 'ARRIVED'
    | 'IN_PROGRESS'
    | 'COMPLETED'
    | 'PAYMENT_PENDING'
    | 'RATING_PENDING'
    | 'CANCELLED'
    | 'TIMEOUT';

export type JobLocation = {
    address: string;
    lat?: number;
    lng?: number;
};

export type CreateJobDto = {
    jobType: JobType;
    serviceType?: string;
    problem?: string;
    vehicleType?: string;
    location: JobLocation;
    notes?: string;
    customerId?: string;
    priority?: 'STANDARD' | 'EMERGENCY';
};

export type UpdateJobStatusDto = {
    status: JobStatus;
    reason?: string;
};

export type AssignJobDto = {
    mechanicId: string;
};

export type JobAuditEntry = {
    status: JobStatus;
    note?: string;
    updatedBy?: string;
    updatedAt?: string;
};

export type JobRecord = CreateJobDto & {
    id: string;
    status: JobStatus;
    price?: number;
    mechanicId?: string;
    rejectReason?: string;
    auditLog?: JobAuditEntry[];
    createdAt: string;
    updatedAt: string;
};
