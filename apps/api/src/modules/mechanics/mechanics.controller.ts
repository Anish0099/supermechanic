import { Request, Response } from 'express';
import { MechanicsService } from './mechanics.service';
import { CreateMechanicDto, UpdateMechanicDto } from './mechanics.schemas';

export class MechanicsController {
    private mechanicsService: MechanicsService;

    constructor() {
        this.mechanicsService = new MechanicsService();
    }

    public async createMechanic(req: Request, res: Response): Promise<Response> {
        const mechanicData: CreateMechanicDto = req.body;
        try {
            const newMechanic = await this.mechanicsService.createMechanic(mechanicData);
            return res.status(201).json(newMechanic);
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to create mechanic';
            return res.status(400).json({ message });
        }
    }

    public async getMechanics(req: Request, res: Response): Promise<Response> {
        try {
            const mechanics = await this.mechanicsService.getAllMechanics();
            return res.status(200).json(mechanics);
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to load mechanics';
            return res.status(500).json({ message });
        }
    }

    public async getMechanicById(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        try {
            const mechanic = await this.mechanicsService.getMechanicById(id);
            if (!mechanic) {
                return res.status(404).json({ message: 'Mechanic not found' });
            }
            return res.status(200).json(mechanic);
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to load mechanic';
            return res.status(500).json({ message });
        }
    }

    public async updateMechanic(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const mechanicData: UpdateMechanicDto = req.body;
        try {
            const updatedMechanic = await this.mechanicsService.updateMechanic(id, mechanicData);
            if (!updatedMechanic) {
                return res.status(404).json({ message: 'Mechanic not found' });
            }
            return res.status(200).json(updatedMechanic);
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to update mechanic';
            return res.status(400).json({ message });
        }
    }

    public async deleteMechanic(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        try {
            const deleted = await this.mechanicsService.deleteMechanic(id);
            if (!deleted) {
                return res.status(404).json({ message: 'Mechanic not found' });
            }
            return res.status(204).send();
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to delete mechanic';
            return res.status(500).json({ message });
        }
    }
}

const mechanicsController = new MechanicsController();

export const createMechanic = (req: Request, res: Response) =>
    mechanicsController.createMechanic(req, res);
export const getAllMechanics = (req: Request, res: Response) =>
    mechanicsController.getMechanics(req, res);
export const getMechanicById = (req: Request, res: Response) =>
    mechanicsController.getMechanicById(req, res);
export const updateMechanic = (req: Request, res: Response) =>
    mechanicsController.updateMechanic(req, res);
export const deleteMechanic = (req: Request, res: Response) =>
    mechanicsController.deleteMechanic(req, res);