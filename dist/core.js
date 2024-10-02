"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const config_1 = __importDefault(require("config"));
const express_1 = __importDefault(require("express"));
const logger_1 = __importDefault(require("../config/logger"));
//Middlewares
const morganMiddleware_1 = __importDefault(require("./middlewares/morganMiddleware"));
const exceptionHandlerMiddleware_1 = __importDefault(require("./middlewares/exceptionHandlerMiddleware"));
const cors_1 = __importDefault(require("cors"));
//OpenAPI - Swagger
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swaggerOptions_1 = __importDefault(require("../config/swaggerOptions"));
//Database
const databaseConnection_1 = __importDefault(require("../config/databaseConnection"));
//Routes
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const gifListRoutes_1 = __importDefault(require("./routes/gifListRoutes"));
const giftRoutes_1 = __importDefault(require("./routes/giftRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
/**
 * Core Application
 */
const core = (0, express_1.default)();
core.use(express_1.default.json());
core.use((0, cors_1.default)());
/**
 * Routes configs
*/
core.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerOptions_1.default));
core.use('/users', userRoutes_1.default);
core.use('/gift-list', gifListRoutes_1.default);
core.use('/gifts', giftRoutes_1.default);
core.use('/auth', authRoutes_1.default);
/**
 * Custom middlewares
 */
core.use(morganMiddleware_1.default);
core.use(exceptionHandlerMiddleware_1.default);
const port = config_1.default.get('port');
core.listen(port, async () => {
    await (0, databaseConnection_1.default)();
    logger_1.default.info(`Rodando a aplicação na porta ${port}`);
});
