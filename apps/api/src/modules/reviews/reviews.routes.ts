import { Router } from 'express';
import { createReview, getReviews, updateReview, deleteReview } from './reviews.controller';

const router = Router();

// Route to create a new review
router.post('/', createReview);

// Route to get all reviews
router.get('/', getReviews);

// Route to update a review by ID
router.put('/:id', updateReview);

// Route to delete a review by ID
router.delete('/:id', deleteReview);

export default router;