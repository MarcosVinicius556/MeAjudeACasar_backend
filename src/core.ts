require("dotenv").config();

import config from 'config';
import express from 'express';
import Logger from '../config/logger';

//Middlewares
import morganMiddleware from './middlewares/morganMiddleware';
import cors from 'cors';

//OpenAPI - Swagger
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from '../config/swaggerOptions';

//Database
import startDatabaseConnection from '../config/databaseConnection';

//Routes
import userRouter from './routes/userRoutes';

/**
 * Core Application
 */
const core = express();

/**
 * Middleware configs
*/
core.use(express.json());
core.use(morganMiddleware);
core.use(cors());

/**
 * Routes configs
*/
core.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
core.use('/users', userRouter);

const port = config.get<number>('port');

core.listen(port, async () => {
    await startDatabaseConnection()

    Logger.info(`Rodando a aplicação na porta ${port}`);
});