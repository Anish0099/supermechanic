import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../../db/prisma';

type RegisterPayload = {
    username: string;
    email: string;
    password: string;
};

type LoginPayload = {
    email: string;
    password: string;
};

export class AuthService {
    async register(payload: RegisterPayload) {
        const hashedPassword = await bcrypt.hash(payload.password, 10);
        return prisma.user.create({
            data: {
                name: payload.username,
                email: payload.email,
                password: hashedPassword,
                role: 'CUSTOMER',
            },
        });
    }

    async login(payload: LoginPayload): Promise<{ accessToken: string }> {
        const user = await prisma.user.findUnique({ where: { email: payload.email } });
        if (!user || !(await bcrypt.compare(payload.password, user.password))) {
            throw new Error('Invalid credentials');
        }
        const secret = process.env.JWT_SECRET || 'dev-secret';
        const accessToken = jwt.sign({ sub: user.id, email: user.email }, secret, {
            expiresIn: '7d',
        });
        return { accessToken };
    }

    async logout() {
        return;
    }
}