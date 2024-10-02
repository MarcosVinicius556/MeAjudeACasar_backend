"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class InvalidCredentialsException extends Error {
    constructor(id) {
        super(`Credenciais inválidas. Credênciais: ${id}`);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.default = InvalidCredentialsException;
