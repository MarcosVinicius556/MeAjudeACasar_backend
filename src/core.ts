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
import authRouter from './routes/authRoutes';

/**
 * Core Application
 */
const core = express();
core.use(cors());
core.use(express.json());

/**
 * Routes configs
*/
core.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
core.use('/users', userRouter);
core.use('/auth', authRouter)


core.use(morganMiddleware);
core.use(ExceptionHandler);

const port = config.get<number>('port');

core.listen(port, async () => {
    await startDatabaseConnection()

    Logger.info(`Rodando a aplicação na porta ${port}`);
});