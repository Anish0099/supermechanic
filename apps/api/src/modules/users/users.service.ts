import prisma from '../../db/prisma';
import { CreateUserDto, UpdateUserDto } from './users.schemas';

export class UsersService {

    async createUser(data: CreateUserDto) {
        return prisma.user.create({
            data: {
                ...data,
                role: data.role?.toUpperCase() as CreateUserDto['role'],
            },
        });
    }

    async getUserById(id: string) {
        return prisma.user.findUnique({
            where: { id },
        });
    }

    async updateUser(id: string, data: UpdateUserDto) {
        return prisma.user.update({
            where: { id },
            data: {
                ...data,
                role: data.role ? (data.role.toUpperCase() as UpdateUserDto['role']) : undefined,
            },
        });
    }

    async deleteUser(id: string) {
        return prisma.user.delete({
            where: { id },
        });
    }

    async getAllUsers() {
        return prisma.user.findMany();
    }
}