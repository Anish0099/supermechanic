import { Request, Response } from 'express';
import { CustomersService } from './customers.service';
import { CreateCustomerDto, UpdateCustomerDto } from './customers.schemas';

export class CustomersController {
    private customerService: CustomersService;

    constructor() {
        this.customerService = new CustomersService();
    }

    public async createCustomer(req: Request, res: Response): Promise<Response> {
        const customerData: CreateCustomerDto = req.body;
        try {
            const newCustomer = await this.customerService.createCustomer(customerData);
            return res.status(201).json(newCustomer);
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to create customer';
            return res.status(500).json({ message });
        }
    }

    public async getCustomerById(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        try {
            const customer = await this.customerService.getCustomerById(id);
            if (!customer) {
                return res.status(404).json({ message: 'Customer not found' });
            }
            return res.status(200).json(customer);
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to load customer';
            return res.status(500).json({ message });
        }
    }

    public async getAllCustomers(req: Request, res: Response): Promise<Response> {
        try {
            const customers = await this.customerService.getAllCustomers();
            return res.status(200).json(customers);
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to load customers';
            return res.status(500).json({ message });
        }
    }

    public async updateCustomer(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const customerData: UpdateCustomerDto = req.body;
        try {
            const updatedCustomer = await this.customerService.updateCustomer(id, customerData);
            if (!updatedCustomer) {
                return res.status(404).json({ message: 'Customer not found' });
            }
            return res.status(200).json(updatedCustomer);
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to update customer';
            return res.status(500).json({ message });
        }
    }

    public async deleteCustomer(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        try {
            const deleted = await this.customerService.deleteCustomer(id);
            if (!deleted) {
                return res.status(404).json({ message: 'Customer not found' });
            }
            return res.status(204).send();
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to delete customer';
            return res.status(500).json({ message });
        }
    }
}

const customersController = new CustomersController();

export const createCustomer = (req: Request, res: Response) =>
    customersController.createCustomer(req, res);
export const getCustomerById = (req: Request, res: Response) =>
    customersController.getCustomerById(req, res);
export const getAllCustomers = (req: Request, res: Response) =>
    customersController.getAllCustomers(req, res);
export const updateCustomer = (req: Request, res: Response) =>
    customersController.updateCustomer(req, res);
export const deleteCustomer = (req: Request, res: Response) =>
    customersController.deleteCustomer(req, res);