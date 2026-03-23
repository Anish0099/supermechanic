import mongoose, { Schema } from 'mongoose';

const JobSchema = new Schema(
    {
        jobType: {
            type: String,
            enum: ['FIXED', 'INSPECTION', 'EMERGENCY'],
            required: true,
        },
        status: {
            type: String,
            enum: [
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
            ],
            default: 'REQUEST_CREATED',
        },
        serviceType: String,
        problem: String,
        vehicleType: String,
        notes: String,
        rejectReason: String,
        auditLog: [
            {
                status: String,
                note: String,
                updatedBy: String,
                updatedAt: Date,
            },
        ],
        price: Number,
        inspectionFee: Number,
        finalPrice: Number,
        priority: {
            type: String,
            enum: ['STANDARD', 'EMERGENCY'],
            default: 'STANDARD',
        },
        customerId: String,
        mechanicId: String,
        location: {
            type: {
                type: String,
                enum: ['Point'],
                default: 'Point',
            },
            coordinates: {
                type: [Number],
                default: undefined,
            },
            address: {
                type: String,
                required: true,
            },
        },
    },
    { timestamps: true }
);

JobSchema.index({ location: '2dsphere' });

JobSchema.set('toJSON', {
    transform: (_doc, ret) => {
        const record = ret as any;
        record.id = record._id?.toString();
        delete record._id;
        delete record.__v;
        return record;
    },
});

const JobModel = mongoose.models.Job || mongoose.model('Job', JobSchema);

export default JobModel;
