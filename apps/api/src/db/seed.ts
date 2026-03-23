import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Seed users
    const customer = await prisma.user.create({
        data: {
            name: 'John Doe',
            email: 'john.doe@example.com',
            role: 'CUSTOMER',
        },
    });

    const mechanic = await prisma.user.create({
        data: {
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            role: 'MECHANIC',
        },
    });

    const admin = await prisma.user.create({
        data: {
            name: 'Admin User',
            email: 'admin@example.com',
            role: 'ADMIN',
        },
    });

    // Seed vehicles
    const vehicle1 = await prisma.vehicle.create({
        data: {
            ownerId: customer.id,
            make: 'Toyota',
            model: 'Camry',
            year: 2020,
        },
    });

    const vehicle2 = await prisma.vehicle.create({
        data: {
            ownerId: customer.id,
            make: 'Honda',
            model: 'Civic',
            year: 2019,
        },
    });

    // Seed services
    const service1 = await prisma.serviceCatalog.create({
        data: {
            name: 'Oil Change',
            description: 'Change engine oil and filter',
            price: 50,
        },
    });

    const service2 = await prisma.serviceCatalog.create({
        data: {
            name: 'Tire Rotation',
            description: 'Rotate tires for even wear',
            price: 30,
        },
    });

    // Seed bookings
    await prisma.booking.create({
        data: {
            customerId: customer.id,
            mechanicId: mechanic.id,
            vehicleId: vehicle1.id,
            serviceId: service1.id,
            date: new Date(),
        },
    });

    console.log({ customer, mechanic, admin, vehicle1, vehicle2, service1, service2 });
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });