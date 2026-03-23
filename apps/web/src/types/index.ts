export type User = {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'mechanic' | 'admin';
  createdAt: Date;
  updatedAt: Date;
};

export type Vehicle = {
  id: string;
  userId: string;
  make: string;
  model: string;
  year: number;
  createdAt: Date;
  updatedAt: Date;
};

export type Service = {
  id: string;
  name: string;
  description: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
};

export type Booking = {
  id: string;
  userId: string;
  vehicleId: string;
  serviceId: string;
  date: Date;
  status: 'pending' | 'completed' | 'canceled';
  createdAt: Date;
  updatedAt: Date;
};

export type Review = {
  id: string;
  userId: string;
  mechanicId: string;
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Notification = {
  id: string;
  userId: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
  updatedAt: Date;
};