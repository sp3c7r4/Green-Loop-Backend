import express, { Request, Response } from 'express';
import Logger from '../src/utils/logger';
import { address } from 'ip';
import env from '../src/config/env';
import { connectSQL } from '../src/config/database';
import errorHandler from '../src/middlewares/errorMiddleWare';
import userRoutes from './../src/routes/user.routes';

// redis.connect()
const app = express();
app.use(express.json());

/** Socket Server */

/** Database Connection */
connectSQL(); /* Connect to PostGreSQL */

/* User Routes */
app.use('/api/v1/user/', userRoutes);

app.get('/', (_req: Request, res: Response) => {
  res.status(200).send('Server working perfectly...');
});

/** Handles Error */
app.use(errorHandler);

app.listen(env.PORT, () => {
  Logger.server(`Server started on http://${address()}:${env.PORT}`);
});
