import { Router, Request, Response, NextFunction } from 'express';
import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from './users.controller';
import { z } from 'zod';
import { CreateUserSchema, UpdateUserSchema } from './users.schemas';

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

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', validateSchema(CreateUserSchema), createUser);
router.put('/:id', validateSchema(UpdateUserSchema), updateUser);
router.delete('/:id', deleteUser);

export default router;