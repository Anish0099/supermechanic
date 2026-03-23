import prisma from '../../db/prisma';
import { CreateMechanicDto, UpdateMechanicDto } from './mechanics.schemas';

export class MechanicsService {

  async createMechanic(data: CreateMechanicDto) {
    return prisma.mechanic.create({
      data,
    });
  }

  async getAllMechanics() {
    return prisma.mechanic.findMany();
  }

  async getMechanicById(id: string) {
    return prisma.mechanic.findUnique({
      where: { id },
    });
  }

  async updateMechanic(id: string, data: UpdateMechanicDto) {
    return prisma.mechanic.update({
      where: { id },
      data,
    });
  }

  async deleteMechanic(id: string) {
    return prisma.mechanic.delete({
      where: { id },
    });
  }
}