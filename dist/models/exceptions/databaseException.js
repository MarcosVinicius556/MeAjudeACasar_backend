"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DatabaseException extends Error {
    constructor(message) {
        super(`Ocorreu um erro ao tentar efetuar a operação no banco de dados! Motivo: ${message}`);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.default = DatabaseException;
