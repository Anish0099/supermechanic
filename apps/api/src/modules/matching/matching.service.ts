import MechanicLocationModel from './matching.model';

export type MechanicMatch = {
    id: string;
    mechanicId: string;
    name?: string;
    rating?: number;
    distanceMeters?: number;
    location?: {
        address?: string;
        coordinates?: number[];
    };
};

type NearbyQuery = {
    lat: number;
    lng: number;
    radiusKm: number;
    limit: number;
};

type UpsertPayload = {
    mechanicId: string;
    name?: string;
    rating?: number;
    isOnline?: boolean;
    isAvailable?: boolean;
    lat: number;
    lng: number;
    address?: string;
};

export class MatchingService {
    async upsertMechanicLocation(payload: UpsertPayload) {
        const update = {
            name: payload.name,
            rating: payload.rating,
            isOnline: payload.isOnline,
            isAvailable: payload.isAvailable,
            location: {
                type: 'Point',
                coordinates: [payload.lng, payload.lat],
                address: payload.address,
            },
            lastSeenAt: new Date(),
        };

        const mechanic = await MechanicLocationModel.findOneAndUpdate(
            { mechanicId: payload.mechanicId },
            update,
            { upsert: true, new: true }
        );

        return mechanic.toJSON();
    }

    async findNearbyMechanics(query: NearbyQuery): Promise<MechanicMatch[]> {
        const { lat, lng, radiusKm, limit } = query;
        const radiusMeters = radiusKm * 1000;

        const results = await MechanicLocationModel.aggregate([
            {
                $geoNear: {
                    near: { type: 'Point', coordinates: [lng, lat] },
                    distanceField: 'distanceMeters',
                    maxDistance: radiusMeters,
                    spherical: true,
                },
            },
            {
                $match: {
                    isOnline: true,
                    isAvailable: true,
                },
            },
            {
                $sort: { distanceMeters: 1, rating: -1 },
            },
            {
                $limit: limit,
            },
        ]);

        return results.map((doc) => ({
            id: doc._id.toString(),
            mechanicId: doc.mechanicId,
            name: doc.name,
            rating: doc.rating,
            distanceMeters: doc.distanceMeters,
            location: doc.location,
        }));
    }
}
