import PaymentModel from './payments.model';

export class PaymentsMongoService {
    async createPendingPayment(payload: {
        jobId: string;
        customerId?: string;
        amount: number;
        currency?: string;
        intentId?: string;
    }) {
        const payment = await PaymentModel.create({
            jobId: payload.jobId,
            customerId: payload.customerId,
            amount: payload.amount,
            currency: payload.currency ?? 'inr',
            status: 'PENDING',
            intentId: payload.intentId,
        });

        return payment.toJSON();
    }

    async updateStatus(intentId: string, status: 'SUCCEEDED' | 'FAILED') {
        const payment = await PaymentModel.findOneAndUpdate(
            { intentId },
            { status },
            { new: true }
        );

        return payment ? payment.toJSON() : null;
    }
}
