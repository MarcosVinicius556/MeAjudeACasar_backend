require("dotenv").config();

import config from 'config';
import express from 'express';
import Logger from '../config/logger';

//Middlewares
import morganMiddleware from './middlewares/morganMiddleware';

//OpenAPI - Swagger
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import swaggerOptions from '../config/swaggerOptions';

//CORS
import cors from 'cors';

//Database
import startDatabaseConnection from '../config/databaseConnection';

//Routes
import userRouter from './routes/userRoutes';



const core = express();

//Swagger Middleware Config
const swaggerSpec = swaggerJSDoc(swaggerOptions);

core.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc({
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API - Me Ajude A Casar',
            version: '1.0.0',
            description: `API desenvolvida para criar uma lista dinâmica de presentes 
                          online, visando facilitar a vida de futuros casais que estão
                          pensando em fazer um chá de panela por exemplo.`
        },
        servers: [
            {
                url: `http://127.0.0.1:3000`
            }
        ],
    },
    apis: ['./src/routes/**/*.ts'],})));

/**
 * Middleware configs
 */
core.use(express.json());
core.use(morganMiddleware);
core.use(cors());

/**
 * Routes configs
 */

core.use('/users', userRouter);

const port = config.get<number>('port');

core.listen(port, async () => {
    await startDatabaseConnection()

    Logger.info(`Rodando a aplicação na porta ${port}`);
});