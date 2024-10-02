"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class InvalidArgumentException extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.default = InvalidArgumentException;
