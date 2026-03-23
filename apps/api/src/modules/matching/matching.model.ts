import mongoose, { Schema } from 'mongoose';

const MechanicLocationSchema = new Schema(
    {
        mechanicId: { type: String, required: true, unique: true },
        name: String,
        rating: { type: Number, default: 4.5 },
        isOnline: { type: Boolean, default: true },
        isAvailable: { type: Boolean, default: true },
        location: {
            type: {
                type: String,
                enum: ['Point'],
                default: 'Point',
            },
            coordinates: {
                type: [Number],
                required: true,
            },
            address: { type: String },
        },
        lastSeenAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

MechanicLocationSchema.index({ location: '2dsphere' });

MechanicLocationSchema.set('toJSON', {
    transform: (_doc, ret) => {
        const record = ret as any;
        record.id = record._id?.toString();
        delete record._id;
        delete record.__v;
        return record;
    },
});

const MechanicLocationModel =
    mongoose.models.MechanicLocation ||
    mongoose.model('MechanicLocation', MechanicLocationSchema);

export default MechanicLocationModel;
