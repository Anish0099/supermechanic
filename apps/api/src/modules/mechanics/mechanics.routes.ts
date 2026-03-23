import { Router } from 'express';
import { 
    getAllMechanics, 
    getMechanicById, 
    createMechanic, 
    updateMechanic, 
    deleteMechanic 
} from './mechanics.controller';

const router = Router();

router.get('/', getAllMechanics);
router.get('/:id', getMechanicById);
router.post('/', createMechanic);
router.put('/:id', updateMechanic);
router.delete('/:id', deleteMechanic);

export default router;