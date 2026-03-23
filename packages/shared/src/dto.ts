export interface CustomerDTO {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
}

export interface MechanicDTO {
    id: string;
    name: string;
    email: string;
    phone: string;
    skills: string[];
}

export interface VehicleDTO {
    id: string;
    ownerId: string;
    make: string;
    model: string;
    year: number;
    licensePlate: string;
}

export interface ServiceDTO {
    id: string;
    name: string;
    description: string;
    price: number;
}

export interface BookingDTO {
    id: string;
    customerId: string;
    mechanicId: string;
    vehicleId: string;
    serviceId: string;
    date: string;
    status: 'pending' | 'completed' | 'canceled';
}

export interface ReviewDTO {
    id: string;
    bookingId: string;
    rating: number;
    comment: string;
}

export interface PaymentDTO {
    id: string;
    bookingId: string;
    amount: number;
    method: 'credit_card' | 'debit_card' | 'paypal';
    status: 'pending' | 'completed' | 'failed';
}

export interface AdminDTO {
    id: string;
    name: string;
    email: string;
}