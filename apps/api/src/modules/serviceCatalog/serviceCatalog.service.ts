import prisma from '../../db/prisma';
import { CreateServiceDto, UpdateServiceDto } from './serviceCatalog.schemas';

export class ServiceCatalogService {
    async createService(serviceData: CreateServiceDto) {
        return prisma.service.create({
            data: {
                name: serviceData.name,
                price: serviceData.price,
                description: serviceData.description ?? '',
            },
        });
    }

    async getAllServices() {
        return prisma.service.findMany();
    }

    async getServiceById(id: string) {
        return prisma.service.findUnique({
            where: { id },
        });
    }

    async updateService(id: string, serviceData: UpdateServiceDto) {
        return prisma.service.update({
            where: { id },
            data: {
                name: serviceData.name,
                price: serviceData.price,
                description: serviceData.description,
            },
        });
    }

    async deleteService(id: string) {
        return prisma.service.delete({
            where: { id },
        });
    }
}