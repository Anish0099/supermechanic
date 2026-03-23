import QuoteModel from './quotes.model';
import { CreateQuoteDto, UpdateQuoteDto } from './quotes.schemas';

export class QuoteService {
    async createQuote(data: CreateQuoteDto) {
        const quote = await QuoteModel.create({
            customerId: data.customerId,
            mechanicId: data.mechanicId,
            serviceId: data.serviceId,
            estimatedCost: data.estimatedCost,
            status: data.status,
        });
        return quote.toJSON();
    }

    async getQuoteById(id: string) {
        const quote = await QuoteModel.findById(id);
        return quote ? quote.toJSON() : null;
    }

    async getQuotes() {
        const quotes = await QuoteModel.find().sort({ createdAt: -1 });
        return quotes.map((quote) => quote.toJSON());
    }

    async updateQuote(id: string, data: UpdateQuoteDto) {
        const quote = await QuoteModel.findByIdAndUpdate(
            id,
            {
                customerId: data.customerId,
                mechanicId: data.mechanicId,
                serviceId: data.serviceId,
                estimatedCost: data.estimatedCost,
                status: data.status,
            },
            { new: true }
        );
        return quote ? quote.toJSON() : null;
    }

    async deleteQuote(id: string) {
        const quote = await QuoteModel.findByIdAndDelete(id);
        return quote ? quote.toJSON() : null;
    }
}