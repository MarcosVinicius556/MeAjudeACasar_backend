"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const morgan_1 = __importDefault(require("morgan"));
const config_1 = __importDefault(require("config"));
const logger_1 = __importDefault(require("../../config/logger"));
const EnviromentType_1 = require("../../config/enums/EnviromentType");
const stream = {
    write: (message) => logger_1.default.http(message)
};
const skip = () => {
    const env = config_1.default.get('env') || EnviromentType_1.EnviromentType.DEVELOPMENT;
    return env !== EnviromentType_1.EnviromentType.DEVELOPMENT;
};
const morganMiddleware = (0, morgan_1.default)(":method :url :status :res[content-length] - :response-time ms", { stream, skip });
exports.default = morganMiddleware;
