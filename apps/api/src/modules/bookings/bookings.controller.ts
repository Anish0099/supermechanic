import { Request, Response } from 'express';
import { BookingService } from './bookings.service';
import { CreateBookingDto, UpdateBookingDto } from './bookings.schemas';

export class BookingsController {
    private bookingService: BookingService;

    constructor() {
        this.bookingService = new BookingService();
    }

    public async createBooking(req: Request, res: Response): Promise<void> {
        try {
            const bookingData: CreateBookingDto = req.body;
            const newBooking = await this.bookingService.createBooking(bookingData);
            res.status(201).json(newBooking);
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to create booking';
            res.status(500).json({ message });
        }
    }

    public async getBooking(req: Request, res: Response): Promise<void> {
        try {
            const bookingId = req.params.id;
            const booking = await this.bookingService.getBooking(bookingId);
            if (!booking) {
                res.status(404).json({ message: 'Booking not found' });
                return;
            }
            res.status(200).json(booking);
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to load booking';
            res.status(500).json({ message });
        }
    }

    public async updateBooking(req: Request, res: Response): Promise<void> {
        try {
            const bookingId = req.params.id;
            const bookingData: UpdateBookingDto = req.body;
            const updatedBooking = await this.bookingService.updateBooking(bookingId, bookingData);
            if (!updatedBooking) {
                res.status(404).json({ message: 'Booking not found' });
                return;
            }
            res.status(200).json(updatedBooking);
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to update booking';
            res.status(500).json({ message });
        }
    }

    public async deleteBooking(req: Request, res: Response): Promise<void> {
        try {
            const bookingId = req.params.id;
            const deleted = await this.bookingService.deleteBooking(bookingId);
            if (!deleted) {
                res.status(404).json({ message: 'Booking not found' });
                return;
            }
            res.status(204).send();
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to delete booking';
            res.status(500).json({ message });
        }
    }

    public async getAllBookings(req: Request, res: Response): Promise<void> {
        try {
            const bookings = await this.bookingService.getAllBookings();
            res.status(200).json(bookings);
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to load bookings';
            res.status(500).json({ message });
        }
    }
}

const bookingsController = new BookingsController();

export const createBooking = (req: Request, res: Response) => bookingsController.createBooking(req, res);
export const getBooking = (req: Request, res: Response) => bookingsController.getBooking(req, res);
export const updateBooking = (req: Request, res: Response) => bookingsController.updateBooking(req, res);
export const deleteBooking = (req: Request, res: Response) => bookingsController.deleteBooking(req, res);
export const getAllBookings = (req: Request, res: Response) => bookingsController.getAllBookings(req, res);