import express from 'express';
import './config/env';
import http from 'http';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './routes/index';
import errorHandler from './middlewares/errorHandler';
import logger from './config/logger';
import { connectToDatabase } from './db/prisma';
import { connectToMongo } from './db/mongoose';
import { initSocket } from './realtime/socket';

const app = express();
const PORT = Number(process.env.PORT) || 5000;
const server = http.createServer(app);

// Middleware
app.use(cors());
app.use('/api/payments/webhook', bodyParser.raw({ type: 'application/json' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to the databases
connectToDatabase().catch((error) => {
    logger.error(`Prisma connection failed: ${error.message}`);
});
connectToMongo().catch((error) => {
    logger.error(`Mongo connection failed: ${error.message}`);
});

// Routes
app.use('/api', routes);

// Error handling middleware
app.use(errorHandler);

// Start the server
initSocket(server);
server.listen(PORT, () => {
    logger.info(`Server is running on http://localhost:${PORT}`);
});