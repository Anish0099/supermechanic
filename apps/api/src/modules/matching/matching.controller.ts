import { Request, Response } from 'express';
import { MatchingService } from './matching.service';
import { getSocket } from '../../realtime/socket';

const matchingService = new MatchingService();

export const upsertMechanicLocation = async (req: Request, res: Response) => {
    try {
        const { mechanicId, name, rating, isOnline, isAvailable, lat, lng, address } = req.body || {};

        if (!mechanicId || typeof lat !== 'number' || typeof lng !== 'number') {
            return res.status(400).json({ message: 'mechanicId, lat, lng are required' });
        }

        const record = await matchingService.upsertMechanicLocation({
            mechanicId,
            name,
            rating,
            isOnline,
            isAvailable,
            lat,
            lng,
            address,
        });
        getSocket()?.emit('mechanic_location_update', record);
        return res.status(200).json(record);
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to update mechanic location';
        return res.status(500).json({ message });
    }
};

export const findNearbyMechanics = async (req: Request, res: Response) => {
    try {
        const lat = Number(req.query.lat);
        const lng = Number(req.query.lng);

        if (Number.isNaN(lat) || Number.isNaN(lng)) {
            return res.status(400).json({ message: 'lat and lng are required' });
        }

        const radiusKm = req.query.radiusKm ? Number(req.query.radiusKm) : 5;
        const limit = req.query.limit ? Number(req.query.limit) : 5;

        const mechanics = await matchingService.findNearbyMechanics({
            lat,
            lng,
            radiusKm,
            limit,
        });

        return res.status(200).json(mechanics);
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to fetch mechanics';
        return res.status(500).json({ message });
    }
};
