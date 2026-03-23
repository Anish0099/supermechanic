import prisma from '../../db/prisma';
import { CreateVehicleDto, UpdateVehicleDto } from './vehicles.schemas';

export class VehiclesService {

  async createVehicle(data: CreateVehicleDto) {
    return prisma.vehicle.create({
      data: {
        make: data.make,
        model: data.model,
        year: data.year,
        customer: {
          connect: { id: data.customerId },
        },
      },
    });
  }

  async getAllVehicles() {
    return prisma.vehicle.findMany();
  }

  async getVehicleById(id: string) {
    return prisma.vehicle.findUnique({
      where: { id },
    });
  }

  async updateVehicle(id: string, data: UpdateVehicleDto) {
    return prisma.vehicle.update({
      where: { id },
      data: {
        make: data.make,
        model: data.model,
        year: data.year,
        customer: data.customerId ? { connect: { id: data.customerId } } : undefined,
      },
    });
  }

  async deleteVehicle(id: string) {
    return prisma.vehicle.delete({
      where: { id },
    });
  }
}