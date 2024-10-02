"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("./logger"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("config"));
async function startDatabaseConnection() {
    const dbURI = config_1.default.get('dbURI');
    await mongoose_1.default.connect(dbURI)
        .then(() => logger_1.default.info('Conexão com o banco de dados estabelecida com sucesso!'))
        .catch(err => logger_1.default.error('Não foi possível iniciar a conexão com o banco de dados. Erro: ' + err));
}
exports.default = startDatabaseConnection;
