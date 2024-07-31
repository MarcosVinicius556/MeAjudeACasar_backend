require("dotenv").config();

import Logger from '../config/logger';
import express from 'express';
import config from 'config';

//Middlewares
import morganMiddleware from './middlewares/morganMiddleware';

const core = express();

core.use(express.json());
core.use(morganMiddleware)

const port = config.get<number>('port');

core.listen(port, async () => {
    Logger.info(`Rodando a aplicação na porta ${port}`);
});