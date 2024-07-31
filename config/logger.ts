import winston from 'winston';
import config from 'config';
import { EnviromentType } from './enums/EnviromentType';

const logLevels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4
}

const logLevel = () => {
    const env = config.get<string>('env') || EnviromentType.DEVELOPMENT;
    const isDevelopment = env === EnviromentType.DEVELOPMENT;
    
    return isDevelopment ? 'debug' : 'warn';
}

const logColors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'white'
}

const logFormat = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    winston.format.colorize({ all: true }),
    winston.format.printf((info) => `${info.timestamp} - ${info.level} - ${info.message}`)
);

const logTransports = [
    new winston.transports.Console(),
    new winston.transports.File({
        filename: 'logs/all.log'
    }),
]

winston.addColors(logColors);

const Logger = winston.createLogger({
    level: logLevel(),
    levels: logLevels,
    format: logFormat,
    transports: logTransports
});

export default Logger;