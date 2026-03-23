import prisma from '../../db/prisma';
import { CreateBookingDto, UpdateBookingDto } from './bookings.schemas';

export class BookingService {

  async createBooking(createBookingDto: CreateBookingDto) {
    return prisma.booking.create({
      data: {
        customerId: createBookingDto.customerId,
        mechanicId: createBookingDto.mechanicId,
        serviceId: createBookingDto.serviceId,
        date: createBookingDto.date,
        status: createBookingDto.status,
      },
    });
  }

  async getBooking(id: string) {
    return prisma.booking.findUnique({
      where: { id },
    });
  }

  async updateBooking(id: string, updateBookingDto: UpdateBookingDto) {
    return prisma.booking.update({
      where: { id },
      data: {
        customerId: updateBookingDto.customerId,
        mechanicId: updateBookingDto.mechanicId,
        serviceId: updateBookingDto.serviceId,
        date: updateBookingDto.date,
        status: updateBookingDto.status,
      },
    });
  }

  async deleteBooking(id: string) {
    return prisma.booking.delete({
      where: { id },
    });
  }

  async getAllBookings() {
    return prisma.booking.findMany();
  }
}