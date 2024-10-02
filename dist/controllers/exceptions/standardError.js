"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class StandardError {
    constructor(exception, statusCode) {
        this.error = exception.name;
        this.message = exception.message;
        this.statusCode = statusCode;
        this.timestamp = new Date();
    }
}
exports.default = StandardError;
