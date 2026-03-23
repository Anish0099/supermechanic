import prisma from '../../db/prisma';
import { CreateReviewDto, UpdateReviewDto } from './reviews.schemas';

export class ReviewService {
  async createReview(createReviewDto: CreateReviewDto) {
    return prisma.review.create({
      data: {
        bookingId: createReviewDto.bookingId,
        rating: createReviewDto.rating,
        comment: createReviewDto.comment ?? '',
      },
    });
  }

  async getReviews() {
    return prisma.review.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async getReviewById(id: string) {
    return prisma.review.findUnique({
      where: { id },
    });
  }

  async updateReview(id: string, updateReviewDto: UpdateReviewDto) {
    return prisma.review.update({
      where: { id },
      data: {
        rating: updateReviewDto.rating,
        comment: updateReviewDto.comment,
      },
    });
  }

  async deleteReview(id: string) {
    return prisma.review.delete({
      where: { id },
    });
  }
}