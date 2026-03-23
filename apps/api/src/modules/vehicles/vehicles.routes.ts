import { Router } from 'express';
import {
  getAllVehicles,
  getVehicleById,
  createVehicle,
  updateVehicle,
  deleteVehicle,
} from './vehicles.controller';

const router = Router();

// Route to get all vehicles
router.get('/', getAllVehicles);

// Route to get a vehicle by ID
router.get('/:id', getVehicleById);

// Route to create a new vehicle
router.post('/', createVehicle);

// Route to update a vehicle by ID
router.put('/:id', updateVehicle);

// Route to delete a vehicle by ID
router.delete('/:id', deleteVehicle);

export default router;