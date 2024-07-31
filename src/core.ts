require("dotenv").config();

import Logger from '../config/logger';
import express from 'express';
import config from 'config';

//Middlewares
import morganMiddleware from './middlewares/morganMiddleware';

//Database
import startDatabaseConnection from '../config/databaseConnection';

//Routes
import userRouter from './routes/userRoutes';

const core = express();

/**
 * Middleware configs
 */
core.use(express.json());
core.use(morganMiddleware)

/**
 * Routes configs
 */

core.use('/api/', userRouter)

const port = config.get<number>('port');

core.listen(port, async () => {
    await startDatabaseConnection()

    Logger.info(`Rodando a aplicação na porta ${port}`);
});