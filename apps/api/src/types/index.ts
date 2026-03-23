export type UserRole = 'customer' | 'mechanic' | 'admin';

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;
}

export interface Vehicle {
    id: string;
    userId: string;
    make: string;
    model: string;
    year: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface Service {
    id: string;
    name: string;
    description: string;
    price: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface Booking {
    id: string;
    userId: string;
    serviceId: string;
    mechanicId: string;
    date: Date;
    status: 'pending' | 'completed' | 'canceled';
    createdAt: Date;
    updatedAt: Date;
}

export interface Review {
    id: string;
    userId: string;
    mechanicId: string;
    rating: number;
    comment: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Notification {
    id: string;
    userId: string;
    message: string;
    isRead: boolean;
    createdAt: Date;
    updatedAt: Date;
}