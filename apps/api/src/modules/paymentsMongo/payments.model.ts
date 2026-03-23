import mongoose, { Schema } from 'mongoose';

const PaymentSchema = new Schema(
    {
        jobId: { type: String, required: true },
        customerId: { type: String },
        amount: { type: Number, required: true },
        currency: { type: String, default: 'inr' },
        status: {
            type: String,
            enum: ['PENDING', 'SUCCEEDED', 'FAILED'],
            default: 'PENDING',
        },
        intentId: { type: String },
        provider: { type: String, default: 'stripe' },
    },
    { timestamps: true }
);

PaymentSchema.set('toJSON', {
    transform: (_doc, ret) => {
        const record = ret as any;
        record.id = record._id?.toString();
        delete record._id;
        delete record.__v;
        return record;
    },
});

const PaymentModel = mongoose.models.Payment || mongoose.model('Payment', PaymentSchema);

export default PaymentModel;
