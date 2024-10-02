require("dotenv").config();

import config from 'config';
import express from 'express';
import Logger from '../config/logger';

//Middlewares
import morganMiddleware from './middlewares/morganMiddleware';
import ExceptionHandler from './middlewares/exceptionHandlerMiddleware';
import cors from 'cors';

//OpenAPI - Swagger
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from '../config/swaggerOptions';
 
//Database
import startDatabaseConnection from '../config/databaseConnection';

//Routes
import userRouter from './routes/userRoutes';
import giftsRouter from './routes/gifListRoutes';
import giftRouter from './routes/giftRoutes';
import authRouter from './routes/authRoutes';

/**
 * Core Application
 */
const core = express();
core.use(express.json());
core.use(cors());

/**
 * Routes configs
*/
core.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
core.use('/users', userRouter);
core.use('/gift-list', giftsRouter);
core.use('/gifts', giftRouter);
core.use('/auth', authRouter)

/**
 * Custom middlewares
 */
core.use(morganMiddleware);
core.use(ExceptionHandler);

const port = config.get<number>('port');

core.listen(port, async () => {
    await startDatabaseConnection()

    Logger.info(`Rodando a aplicação na porta ${port}`);
});