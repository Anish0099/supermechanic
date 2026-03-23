import { Router } from 'express';
import authRoutes from '../modules/auth/auth.routes';
import usersRoutes from '../modules/users/users.routes';
import customersRoutes from '../modules/customers/customers.routes';
import mechanicsRoutes from '../modules/mechanics/mechanics.routes';
import vehiclesRoutes from '../modules/vehicles/vehicles.routes';
import serviceCatalogRoutes from '../modules/serviceCatalog/serviceCatalog.routes';
import bookingsRoutes from '../modules/bookings/bookings.routes';
import quotesRoutes from '../modules/quotes/quotes.routes';
import paymentsRoutes from '../modules/payments/payments.routes';
import reviewsRoutes from '../modules/reviews/reviews.routes';
import adminRoutes from '../modules/admin/admin.routes';
import notificationsRoutes from '../modules/notifications/notifications.routes';
import jobsRoutes from '../modules/jobs/jobs.routes';
import matchingRoutes from '../modules/matching/matching.routes';
import paymentsMongoRoutes from '../modules/paymentsMongo/payments.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', usersRoutes);
router.use('/customers', customersRoutes);
router.use('/mechanics', mechanicsRoutes);
router.use('/vehicles', vehiclesRoutes);
router.use('/service-catalog', serviceCatalogRoutes);
router.use('/bookings', bookingsRoutes);
router.use('/quotes', quotesRoutes);
router.use('/payments', paymentsRoutes);
router.use('/reviews', reviewsRoutes);
router.use('/admin', adminRoutes);
router.use('/notifications', notificationsRoutes);
router.use('/jobs', jobsRoutes);
router.use('/matching', matchingRoutes);
router.use('/payments-mongo', paymentsMongoRoutes);

export default router;