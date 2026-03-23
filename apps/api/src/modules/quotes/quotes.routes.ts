import { Router } from 'express';
import { 
    createQuote, 
    getQuoteById, 
    updateQuote, 
    deleteQuote, 
    getAllQuotes 
} from './quotes.controller';

const router = Router();

// Route to create a new quote
router.post('/', createQuote);

// Route to get all quotes
router.get('/', getAllQuotes);

// Route to get a quote by ID
router.get('/:id', getQuoteById);

// Route to update a quote by ID
router.put('/:id', updateQuote);

// Route to delete a quote by ID
router.delete('/:id', deleteQuote);

export default router;