import { Request, Response } from 'express';
import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto, UpdateVehicleDto } from './vehicles.schemas';

export class VehiclesController {
    private vehicleService: VehiclesService;

    constructor() {
        this.vehicleService = new VehiclesService();
    }

    public async createVehicle(req: Request, res: Response): Promise<Response> {
        const vehicleData: CreateVehicleDto = req.body;
        try {
            const newVehicle = await this.vehicleService.createVehicle(vehicleData);
            return res.status(201).json(newVehicle);
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to create vehicle';
            return res.status(500).json({ message });
        }
    }

    public async getAllVehicles(req: Request, res: Response): Promise<Response> {
        try {
            const vehicles = await this.vehicleService.getAllVehicles();
            return res.status(200).json(vehicles);
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to load vehicles';
            return res.status(500).json({ message });
        }
    }

    public async getVehicleById(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        try {
            const vehicle = await this.vehicleService.getVehicleById(id);
            if (!vehicle) {
                return res.status(404).json({ message: 'Vehicle not found' });
            }
            return res.status(200).json(vehicle);
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to load vehicle';
            return res.status(500).json({ message });
        }
    }

    public async updateVehicle(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const vehicleData: UpdateVehicleDto = req.body;
        try {
            const updatedVehicle = await this.vehicleService.updateVehicle(id, vehicleData);
            if (!updatedVehicle) {
                return res.status(404).json({ message: 'Vehicle not found' });
            }
            return res.status(200).json(updatedVehicle);
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to update vehicle';
            return res.status(500).json({ message });
        }
    }

    public async deleteVehicle(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        try {
            const deleted = await this.vehicleService.deleteVehicle(id);
            if (!deleted) {
                return res.status(404).json({ message: 'Vehicle not found' });
            }
            return res.status(204).send();
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to delete vehicle';
            return res.status(500).json({ message });
        }
    }
}

const vehiclesController = new VehiclesController();

export const createVehicle = (req: Request, res: Response) => vehiclesController.createVehicle(req, res);
export const getAllVehicles = (req: Request, res: Response) => vehiclesController.getAllVehicles(req, res);
export const getVehicleById = (req: Request, res: Response) => vehiclesController.getVehicleById(req, res);
export const updateVehicle = (req: Request, res: Response) => vehiclesController.updateVehicle(req, res);
export const deleteVehicle = (req: Request, res: Response) => vehiclesController.deleteVehicle(req, res);