import { Router, Request, Response, NextFunction } from 'express';
import { authController } from './auth.controller';
import { z } from 'zod';
import { loginSchema, registerSchema } from './auth.schemas';

const router = Router();

const validateSchema = <T extends z.ZodTypeAny>(schema: T) => {
	return (req: Request, res: Response, next: NextFunction) => {
		const parsed = schema.safeParse(req.body);
		if (!parsed.success) {
			return res.status(400).json({ message: parsed.error.message });
		}
		req.body = parsed.data;
		return next();
	};
};

router.post('/register', validateSchema(registerSchema), (req, res) =>
	authController.register(req, res)
);
router.post('/login', validateSchema(loginSchema), (req, res) => authController.login(req, res));
router.post('/logout', (req, res) => authController.logout(req, res));

export default router;