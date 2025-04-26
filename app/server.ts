import express, { type Request, type Response } from 'express';
import Logger from '../src/utils/logger';
import { address } from 'ip';
import env from '../src/config/env';
import { connectSQL } from '../src/config/database';
import errorHandler from '../src/middlewares/errorMiddleWare';
import userRoutes from './../src/routes/user.routes';
import productRoutes from './../src/routes/product.routes';
import auctionRoutes from './../src/routes/auction.routes';
import cors from 'cors';
import chalk from 'chalk';

// redis.connect()
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: '*',
  }),
);
app.use((req, res, next) => {
  Logger.log(`${chalk.red(`[${req.method}]`)} ${chalk.cyan(req.path)}`);
  next();
});

/** Database Connection */
connectSQL(); /* Connect to PostGreSQL */

/* User Routes */
app.use('/api/v1/user/', userRoutes);

/* Product Routes */
app.use('/api/v1/product/', productRoutes);

/* Auction Routes */
app.use('/api/v1/auction/', auctionRoutes);

app.get('/', (req: Request, res: Response) => {
  res.status(200).send('Server working perfectly...');
});

// Just some changes

/** Handles Error */
app.use(errorHandler);

app.listen(env.PORT, () => {
  Logger.server(`Server started on http://${address()}:${env.PORT}`);
});
