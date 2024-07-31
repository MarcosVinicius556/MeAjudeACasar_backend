require("dotenv").config();

import express from 'express';
import config from 'config';

const core = express();

core.use(express.json());

const port = config.get<number>('port');

core.listen(port, async () => {
    console.log('Aplicação rodando');
});