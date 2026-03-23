import { Request, Response } from 'express';
import { ReviewService } from './reviews.service';
import { CreateReviewDto, UpdateReviewDto } from './reviews.schemas';

export class ReviewController {
    private reviewService: ReviewService;

    constructor() {
        this.reviewService = new ReviewService();
    }

    public async createReview(req: Request, res: Response): Promise<void> {
        try {
            const reviewData: CreateReviewDto = req.body;
            const newReview = await this.reviewService.createReview(reviewData);
            res.status(201).json(newReview);
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to create review';
            res.status(500).json({ message });
        }
    }

    public async getReviews(req: Request, res: Response): Promise<void> {
        try {
            const reviews = await this.reviewService.getReviews();
            res.status(200).json(reviews);
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to load reviews';
            res.status(500).json({ message });
        }
    }

    public async updateReview(req: Request, res: Response): Promise<void> {
        try {
            const reviewId = req.params.id;
            const reviewData: UpdateReviewDto = req.body;
            const updatedReview = await this.reviewService.updateReview(reviewId, reviewData);
            res.status(200).json(updatedReview);
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to update review';
            res.status(500).json({ message });
        }
    }

    public async deleteReview(req: Request, res: Response): Promise<void> {
        try {
            const reviewId = req.params.id;
            await this.reviewService.deleteReview(reviewId);
            res.status(204).send();
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to delete review';
            res.status(500).json({ message });
        }
    }
}

const reviewController = new ReviewController();

export const createReview = (req: Request, res: Response) => reviewController.createReview(req, res);
export const getReviews = (req: Request, res: Response) => reviewController.getReviews(req, res);
export const updateReview = (req: Request, res: Response) => reviewController.updateReview(req, res);
export const deleteReview = (req: Request, res: Response) => reviewController.deleteReview(req, res);