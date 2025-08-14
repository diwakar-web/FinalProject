import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import authRoutes from './routes/authRoutes.js';
import itemRoutes from './routes/itemRoutes.js';
import claimRoutes from './routes/claimRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import reportRoutes from './routes/reportRoutes.js';
import { notFound, errorHandler } from './middlewares/errorMiddleware.js';
import { CLIENT_ORIGIN } from './config/env.js';

const app = express();
app.use(cors({ origin: CLIENT_ORIGIN?.split(',') || '*', credentials: true }));
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req,res)=>res.json({ status: 'ok', service: 'CampusCrate API' }));

app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/claims', claimRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/report', reportRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
