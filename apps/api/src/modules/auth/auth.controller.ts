import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { loginSchema, registerSchema } from './auth.schemas';

const authService = new AuthService();

class AuthController {
    async register(req: Request, res: Response) {
        try {
            const parsed = registerSchema.safeParse(req.body);
            if (!parsed.success) {
                return res.status(400).json({ message: parsed.error.message });
            }
            const user = await authService.register(parsed.data);
            res.status(201).json(user);
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Registration failed';
            res.status(400).json({ message });
        }
    }

    async login(req: Request, res: Response) {
        try {
            const parsed = loginSchema.safeParse(req.body);
            if (!parsed.success) {
                return res.status(400).json({ message: parsed.error.message });
            }
            const token = await authService.login(parsed.data);
            res.status(200).json(token);
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Login failed';
            res.status(400).json({ message });
        }
    }

    async logout(req: Request, res: Response) {
        try {
            const userId = (req as any).user?.id;
            if (!userId) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            await authService.logout();
            res.status(204).send();
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Logout failed';
            res.status(500).json({ message });
        }
    }
}

export const authController = new AuthController();