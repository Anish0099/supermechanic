import PaymentModel from '../paymentsMongo/payments.model';
import { CreatePaymentDto, UpdatePaymentDto } from './payments.schemas';

export class PaymentsService {
  async createPayment(data: CreatePaymentDto) {
    const payment = await PaymentModel.create({
      jobId: data.jobId,
      customerId: data.customerId,
      amount: data.amount,
      currency: data.currency ?? 'inr',
      status: data.status ?? 'PENDING',
      intentId: data.intentId,
      provider: data.provider ?? 'stripe',
    });
    return payment.toJSON();
  }

  async getPayment(id: string) {
    const payment = await PaymentModel.findById(id);
    return payment ? payment.toJSON() : null;
  }

  async getAllPayments() {
    const payments = await PaymentModel.find().sort({ createdAt: -1 });
    return payments.map((payment) => payment.toJSON());
  }

  async updatePayment(id: string, data: UpdatePaymentDto) {
    const payment = await PaymentModel.findByIdAndUpdate(
      id,
      {
        jobId: data.jobId,
        customerId: data.customerId,
        amount: data.amount,
        currency: data.currency,
        status: data.status,
        intentId: data.intentId,
        provider: data.provider,
      },
      { new: true }
    );
    return payment ? payment.toJSON() : null;
  }

  async deletePayment(id: string) {
    const payment = await PaymentModel.findByIdAndDelete(id);
    return payment ? payment.toJSON() : null;
  }
}