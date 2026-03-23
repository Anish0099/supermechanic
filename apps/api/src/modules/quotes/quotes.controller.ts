import { Request, Response } from 'express';
import { QuoteService } from './quotes.service';
import { QuoteSchema } from './quotes.schemas';

export class QuotesController {
    private quoteService: QuoteService;

    constructor() {
        this.quoteService = new QuoteService();
    }

    public async createQuote(req: Request, res: Response): Promise<void> {
        try {
            const parsed = QuoteSchema.safeParse(req.body);
            if (!parsed.success) {
                res.status(400).json({ message: parsed.error.message });
                return;
            }
            const validatedData = parsed.data;
            const newQuote = await this.quoteService.createQuote(validatedData);
            res.status(201).json(newQuote);
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to create quote';
            res.status(400).json({ message });
        }
    }

    public async getQuotes(req: Request, res: Response): Promise<void> {
        try {
            const quotes = await this.quoteService.getQuotes();
            res.status(200).json(quotes);
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to load quotes';
            res.status(500).json({ message });
        }
    }

    public async getQuoteById(req: Request, res: Response): Promise<void> {
        try {
            const quoteId = req.params.id;
            const quote = await this.quoteService.getQuoteById(quoteId);
            if (!quote) {
                res.status(404).json({ message: 'Quote not found' });
                return;
            }
            res.status(200).json(quote);
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to load quote';
            res.status(500).json({ message });
        }
    }

    public async updateQuote(req: Request, res: Response): Promise<void> {
        try {
            const quoteId = req.params.id;
            const parsed = QuoteSchema.safeParse(req.body);
            if (!parsed.success) {
                res.status(400).json({ message: parsed.error.message });
                return;
            }
            const validatedData = parsed.data;
            const updatedQuote = await this.quoteService.updateQuote(quoteId, validatedData);
            if (!updatedQuote) {
                res.status(404).json({ message: 'Quote not found' });
                return;
            }
            res.status(200).json(updatedQuote);
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to update quote';
            res.status(400).json({ message });
        }
    }

    public async deleteQuote(req: Request, res: Response): Promise<void> {
        try {
            const quoteId = req.params.id;
            const deleted = await this.quoteService.deleteQuote(quoteId);
            if (!deleted) {
                res.status(404).json({ message: 'Quote not found' });
                return;
            }
            res.status(204).send();
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to delete quote';
            res.status(500).json({ message });
        }
    }
}

const quotesController = new QuotesController();

export const createQuote = (req: Request, res: Response) => quotesController.createQuote(req, res);
export const getQuoteById = (req: Request, res: Response) => quotesController.getQuoteById(req, res);
export const updateQuote = (req: Request, res: Response) => quotesController.updateQuote(req, res);
export const deleteQuote = (req: Request, res: Response) => quotesController.deleteQuote(req, res);
export const getAllQuotes = (req: Request, res: Response) => quotesController.getQuotes(req, res);