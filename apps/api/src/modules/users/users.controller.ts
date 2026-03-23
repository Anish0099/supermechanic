import { Request, Response } from 'express';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './users.schemas';

const userService = new UsersService();

export const createUser = async (req: Request, res: Response) => {
    try {
        const userData: CreateUserDto = req.body;
        const newUser = await userService.createUser(userData);
        res.status(201).json(newUser);
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to create user';
        res.status(500).json({ message });
    }
};

export const getUserById = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;
        const user = await userService.getUserById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to load user';
        res.status(500).json({ message });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;
        const userData: UpdateUserDto = req.body;
        const updatedUser = await userService.updateUser(userId, userData);
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to update user';
        res.status(500).json({ message });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;
        const deletedUser = await userService.deleteUser(userId);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(204).send();
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to delete user';
        res.status(500).json({ message });
    }
};

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to load users';
        res.status(500).json({ message });
    }
};