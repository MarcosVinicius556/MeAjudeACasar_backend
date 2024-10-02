"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const config_1 = __importDefault(require("config"));
const port = config_1.default.get('port');
const swaggerOptions = {
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
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(swaggerOptions);
exports.default = swaggerSpec;
