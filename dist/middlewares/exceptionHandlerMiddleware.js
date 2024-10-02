"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const standardError_1 = __importDefault(require("../controllers/exceptions/standardError"));
const InvalidArgumentsException_1 = __importDefault(require("../services/exceptions/InvalidArgumentsException"));
const InvalidCredentialsException_1 = __importDefault(require("../services/exceptions/InvalidCredentialsException"));
const resourceNotFoundException_1 = __importDefault(require("../models/exceptions/resourceNotFoundException"));
const ExceptionHandler = (error, req, res, next) => {
    const errorObject = findAndMountExceptionMessage(error);
    return res.status(errorObject.statusCode)
        .json(errorObject);
};
const findAndMountExceptionMessage = (error) => {
    if (error instanceof InvalidArgumentsException_1.default)
        return new standardError_1.default(error, 500);
    if (error instanceof InvalidCredentialsException_1.default)
        return new standardError_1.default(error, 403);
    if (error instanceof resourceNotFoundException_1.default)
        return new standardError_1.default(error, 404);
    return new standardError_1.default(error, 500);
};
exports.default = ExceptionHandler;
