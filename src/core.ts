require("dotenv").config();

import express from 'express';
import config from 'config';

import Logger from '../config/logger';

const core = express();

core.use(express.json());

const port = config.get<number>('port');

core.listen(port, async () => {
    Logger.info(`Rodando a aplicação na porta ${port}`);
});