import express from 'express';

const core = express();

core.use(express.json());

const port = 3000;

core.listen(port, async () => {
    console.log('Aplicação rodando');
});