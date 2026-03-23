import mongoose from 'mongoose';
import env from '../config/env';

export const connectToMongo = async () => {
    if (!env.DATABASE_URL) {
        throw new Error('DATABASE_URL is not set');
    }

    await mongoose.connect(env.DATABASE_URL);
};
