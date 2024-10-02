"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ResourceNotFoundException extends Error {
    constructor(id) {
        super(`Não foi encontrado nenhum recurso com o ID ${id}`);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.default = ResourceNotFoundException;
