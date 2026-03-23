import { Router } from 'express';
import { createBooking, getBooking, updateBooking, deleteBooking, getAllBookings } from './bookings.controller';

const router = Router();

// Route to create a new booking
router.post('/', createBooking);

// Route to get a specific booking by ID
router.get('/:id', getBooking);

// Route to update a booking by ID
router.put('/:id', updateBooking);

// Route to delete a booking by ID
router.delete('/:id', deleteBooking);

// Route to get all bookings
router.get('/', getAllBookings);

export default router;