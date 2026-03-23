import { Request, Response } from 'express';
import Stripe from 'stripe';
import env from '../../config/env';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto, UpdatePaymentDto } from './payments.schemas';
import { JobsService } from '../jobs/jobs.service';
import { getSocket } from '../../realtime/socket';
import { PaymentsMongoService } from '../paymentsMongo/payments.service';

const stripe = env.STRIPE_SECRET_KEY
    ? new Stripe(env.STRIPE_SECRET_KEY, { apiVersion: '2024-06-20' })
    : null;
const jobsService = new JobsService();
const paymentsMongo = new PaymentsMongoService();

export class PaymentsController {
    private paymentService: PaymentsService;

    constructor() {
        this.paymentService = new PaymentsService();
    }

    public async createPayment(req: Request, res: Response): Promise<Response> {
        const paymentData: CreatePaymentDto = req.body;
        try {
            const payment = await this.paymentService.createPayment(paymentData);
            return res.status(201).json(payment);
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to create payment';
            return res.status(500).json({ message });
        }
    }

    public async getPayment(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        try {
            const payment = await this.paymentService.getPayment(id);
            if (!payment) {
                return res.status(404).json({ message: 'Payment not found' });
            }
            return res.status(200).json(payment);
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to load payment';
            return res.status(500).json({ message });
        }
    }

    public async updatePayment(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const paymentData: UpdatePaymentDto = req.body;
        try {
            const updatedPayment = await this.paymentService.updatePayment(id, paymentData);
            if (!updatedPayment) {
                return res.status(404).json({ message: 'Payment not found' });
            }
            return res.status(200).json(updatedPayment);
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to update payment';
            return res.status(500).json({ message });
        }
    }

    public async deletePayment(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        try {
            const deleted = await this.paymentService.deletePayment(id);
            if (!deleted) {
                return res.status(404).json({ message: 'Payment not found' });
            }
            return res.status(204).send();
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to delete payment';
            return res.status(500).json({ message });
        }
    }
}

const controller = new PaymentsController();

export const createPayment = controller.createPayment.bind(controller);
export const getPayment = controller.getPayment.bind(controller);
export const updatePayment = controller.updatePayment.bind(controller);
export const deletePayment = controller.deletePayment.bind(controller);

export const createPaymentIntent = async (req: Request, res: Response) => {
    try {
        if (!stripe) {
            return res.status(500).json({ message: 'Stripe is not configured' });
        }

        const { amount, currency = 'inr', jobId, customerId } = req.body || {};

        if (!amount || typeof amount !== 'number') {
            return res.status(400).json({ message: 'amount is required' });
        }

        const intent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100),
            currency,
            metadata: {
                jobId: jobId ?? '',
                customerId: customerId ?? '',
            },
            automatic_payment_methods: { enabled: true },
        });

        if (jobId) {
            await paymentsMongo.createPendingPayment({
                jobId,
                customerId,
                amount,
                currency,
                intentId: intent.id,
            });
        }

        if (jobId) {
            const job = await jobsService.updateJobStatus(jobId, { status: 'PAYMENT_PENDING' });
            if (job) {
                getSocket()?.to(`job:${job.id}`).emit('job_status_update', job);
            }
        }

        return res.status(200).json({
            clientSecret: intent.client_secret,
            intentId: intent.id,
        });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to create payment intent';
        return res.status(500).json({ message });
    }
};

export const handleStripeWebhook = async (req: Request, res: Response) => {
    if (!stripe || !env.STRIPE_WEBHOOK_SECRET) {
        return res.status(500).json({ message: 'Stripe webhook not configured' });
    }

    const signature = req.headers['stripe-signature'] as string;

    if (!signature) {
        return res.status(400).json({ message: 'Missing Stripe signature' });
    }

    try {
        const event = stripe.webhooks.constructEvent(
            req.body,
            signature,
            env.STRIPE_WEBHOOK_SECRET
        );

        if (event.type === 'payment_intent.succeeded') {
            const intent = event.data.object as Stripe.PaymentIntent;
            const jobId = intent.metadata?.jobId;
            if (intent.id) {
                await paymentsMongo.updateStatus(intent.id, 'SUCCEEDED');
            }

            if (jobId) {
                const job = await jobsService.updateJobStatus(jobId, { status: 'COMPLETED' });
                if (job) {
                    getSocket()?.to(`job:${job.id}`).emit('job_status_update', job);
                }
            }

            return res.status(200).json({ received: true, intentId: intent.id });
        }

        if (event.type === 'payment_intent.payment_failed') {
            const intent = event.data.object as Stripe.PaymentIntent;
            const jobId = intent.metadata?.jobId;

            if (jobId) {
                const job = await jobsService.updateJobStatus(jobId, { status: 'PAYMENT_PENDING' });
                if (job) {
                    getSocket()?.to(`job:${job.id}`).emit('job_status_update', job);
                }
            }
            if (intent.id) {
                await paymentsMongo.updateStatus(intent.id, 'FAILED');
            }
            return res.status(200).json({ received: true });
        }

        return res.status(200).json({ received: true });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Invalid webhook payload';
        return res.status(400).json({ message });
    }
};