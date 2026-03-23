import { Request, Response } from 'express';
import { AdminService } from './admin.service';
import { AdminCreateSchema, AdminUpdateSchema } from './admin.schemas';

export class AdminController {
    private adminService: AdminService;

    constructor() {
        this.adminService = new AdminService();
    }

    public async createAdmin(req: Request, res: Response): Promise<void> {
        const parsed = AdminCreateSchema.safeParse(req.body);
        if (!parsed.success) {
            res.status(400).json({ message: parsed.error.message });
            return;
        }
        try {
            const admin = this.adminService.createAdmin(parsed.data);
            res.status(201).json(admin);
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Error creating admin';
            res.status(500).json({ message });
        }
    }

    public async getAdmins(req: Request, res: Response): Promise<void> {
        try {
            const admins = this.adminService.getAdmins();
            res.status(200).json(admins);
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Error retrieving admins';
            res.status(500).json({ message });
        }
    }

    public async updateAdmin(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const parsed = AdminUpdateSchema.safeParse(req.body);
        if (!parsed.success) {
            res.status(400).json({ message: parsed.error.message });
            return;
        }
        try {
            const updated = this.adminService.updateAdmin(id, parsed.data);
            if (!updated) {
                res.status(404).json({ message: 'Admin not found' });
                return;
            }
            res.status(200).json(updated);
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Error updating admin';
            res.status(500).json({ message });
        }
    }

    public async deleteAdmin(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            const deleted = this.adminService.deleteAdmin(id);
            if (!deleted) {
                res.status(404).json({ message: 'Admin not found' });
                return;
            }
            res.status(204).send();
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Error deleting admin';
            res.status(500).json({ message });
        }
    }
}

const adminController = new AdminController();

export const createAdmin = (req: Request, res: Response) => adminController.createAdmin(req, res);
export const getAdmins = (req: Request, res: Response) => adminController.getAdmins(req, res);
export const updateAdmin = (req: Request, res: Response) => adminController.updateAdmin(req, res);
export const deleteAdmin = (req: Request, res: Response) => adminController.deleteAdmin(req, res);