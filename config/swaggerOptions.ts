import { Options } from 'swagger-jsdoc';
import config from 'config';

const port = config.get<number>('port');

const swaggerOptions: Options = {
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
                url: `http://127.0.0.1:${port}`
            }
        ],
    },
    apis: ['./src/routes/**/*.ts'],

}

export default swaggerOptions;