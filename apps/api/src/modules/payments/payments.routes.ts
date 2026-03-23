import { Router } from 'express';
import {
	createPayment,
	createPaymentIntent,
	deletePayment,
	getPayment,
	handleStripeWebhook,
	updatePayment,
} from './payments.controller';

const router = Router();

// Route to create a new payment
router.post('/', createPayment);
router.post('/intent', createPaymentIntent);
router.post('/webhook', handleStripeWebhook);

// Route to get a payment by ID
router.get('/:id', getPayment);

// Route to update a payment by ID
router.put('/:id', updatePayment);

// Route to delete a payment by ID
router.delete('/:id', deletePayment);

export default router;