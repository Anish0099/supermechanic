import mongoose, { Schema } from 'mongoose';

const QuoteSchema = new Schema(
    {
        customerId: { type: String, required: true },
        mechanicId: { type: String, required: true },
        serviceId: { type: String, required: true },
        estimatedCost: { type: Number, required: true },
        status: {
            type: String,
            enum: ['PENDING', 'ACCEPTED', 'REJECTED'],
            default: 'PENDING',
        },
    },
    { timestamps: true }
);

QuoteSchema.set('toJSON', {
    transform: (_doc, ret) => {
        const record = ret as any;
        record.id = record._id?.toString();
        delete record._id;
        delete record.__v;
        return record;
    },
});

const QuoteModel = mongoose.models.Quote || mongoose.model('Quote', QuoteSchema);

export default QuoteModel;
