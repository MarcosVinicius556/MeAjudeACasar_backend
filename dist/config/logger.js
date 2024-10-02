"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
const config_1 = __importDefault(require("config"));
const EnviromentType_1 = require("./enums/EnviromentType");
const logLevels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4
};
const logLevel = () => {
    const env = config_1.default.get('env') || EnviromentType_1.EnviromentType.DEVELOPMENT;
    const isDevelopment = env === EnviromentType_1.EnviromentType.DEVELOPMENT;
    return isDevelopment ? 'debug' : 'warn';
};
const logColors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'white'
};
const logFormat = winston_1.default.format.combine(winston_1.default.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }), winston_1.default.format.colorize({ all: true }), winston_1.default.format.printf((info) => `${info.timestamp} - ${info.level} - ${info.message}`));
const logTransports = [
    new winston_1.default.transports.Console(),
    new winston_1.default.transports.File({
        filename: 'logs/all.log'
    }),
];
winston_1.default.addColors(logColors);
const Logger = winston_1.default.createLogger({
    level: logLevel(),
    levels: logLevels,
    format: logFormat,
    transports: logTransports
});
exports.default = Logger;
