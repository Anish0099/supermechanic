import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default prisma;

export const connectToDatabase = async () => {
	await prisma.$connect();
};