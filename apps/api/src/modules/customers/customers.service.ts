import prisma from '../../db/prisma';
import { CreateCustomerDto, UpdateCustomerDto } from './customers.schemas';

export class CustomersService {

  async createCustomer(data: CreateCustomerDto) {
    if (!data.userId) {
      throw new Error('userId is required');
    }
    return prisma.customer.create({
      data: {
        phone: data.phone,
        address: data.address,
        user: {
          connect: { id: data.userId },
        },
      },
    });
  }

  async getCustomerById(id: string) {
    return prisma.customer.findUnique({
      where: { id },
    });
  }

  async updateCustomer(id: string, data: UpdateCustomerDto) {
    return prisma.customer.update({
      where: { id },
      data,
    });
  }

  async deleteCustomer(id: string) {
    return prisma.customer.delete({
      where: { id },
    });
  }

  async getAllCustomers() {
    return prisma.customer.findMany();
  }
}