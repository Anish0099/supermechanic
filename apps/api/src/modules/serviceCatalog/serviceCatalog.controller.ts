import { Request, Response } from 'express';
import { ServiceCatalogService } from './serviceCatalog.service';

class ServiceCatalogController {
    private serviceCatalogService: ServiceCatalogService;

    constructor() {
        this.serviceCatalogService = new ServiceCatalogService();
    }

    async getAllServices(req: Request, res: Response) {
        try {
            const services = await this.serviceCatalogService.getAllServices();
            return res.status(200).json(services);
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Error fetching services';
            return res.status(500).json({ message });
        }
    }

    async getServiceById(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const service = await this.serviceCatalogService.getServiceById(id);
            if (!service) {
                return res.status(404).json({ message: 'Service not found' });
            }
            return res.status(200).json(service);
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Error fetching service';
            return res.status(500).json({ message });
        }
    }

    async createService(req: Request, res: Response) {
        try {
            const newService = await this.serviceCatalogService.createService(req.body);
            return res.status(201).json(newService);
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Error creating service';
            return res.status(500).json({ message });
        }
    }

    async updateService(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const updatedService = await this.serviceCatalogService.updateService(id, req.body);
            if (!updatedService) {
                return res.status(404).json({ message: 'Service not found' });
            }
            return res.status(200).json(updatedService);
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Error updating service';
            return res.status(500).json({ message });
        }
    }

    async deleteService(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const deletedService = await this.serviceCatalogService.deleteService(id);
            if (!deletedService) {
                return res.status(404).json({ message: 'Service not found' });
            }
            return res.status(204).send();
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Error deleting service';
            return res.status(500).json({ message });
        }
    }
}

const serviceCatalogController = new ServiceCatalogController();

export const getAllServices = (req: Request, res: Response) =>
    serviceCatalogController.getAllServices(req, res);
export const getServiceById = (req: Request, res: Response) =>
    serviceCatalogController.getServiceById(req, res);
export const createService = (req: Request, res: Response) =>
    serviceCatalogController.createService(req, res);
export const updateService = (req: Request, res: Response) =>
    serviceCatalogController.updateService(req, res);
export const deleteService = (req: Request, res: Response) =>
    serviceCatalogController.deleteService(req, res);