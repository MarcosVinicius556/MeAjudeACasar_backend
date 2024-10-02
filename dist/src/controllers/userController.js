"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.insert = exports.findById = exports.findAll = void 0;
//Services
const userService_1 = __importDefault(require("../services/userService"));
const findAll = async (req, res, next) => {
    const userService = (0, userService_1.default)();
    try {
        const users = await userService.findAll();
        return res.status(200).json(users);
    }
    catch (error) {
        next(error);
    }
};
exports.findAll = findAll;
const findById = async (req, res, next) => {
    const userService = (0, userService_1.default)();
    try {
        const id = req.params.id;
        const user = await userService.findById(id);
        return res.status(200).json(user);
    }
    catch (error) {
        next(error);
    }
};
exports.findById = findById;
const insert = async (req, res, next) => {
    const userService = (0, userService_1.default)();
    try {
        const newUser = req.body;
        const user = await userService.insert(newUser);
        return res.status(200).json(user);
    }
    catch (error) {
        next(error);
    }
};
exports.insert = insert;
const update = async (req, res, next) => {
    const userService = (0, userService_1.default)();
    try {
        const id = req.params.id;
        const newUser = req.body;
        const userUpdated = await userService.update(id, newUser);
        return res.status(200).json(userUpdated);
    }
    catch (error) {
        next(error);
    }
};
exports.update = update;
const remove = async (req, res, next) => {
    const userService = (0, userService_1.default)();
    try {
        const id = req.params.id;
        const isRemoved = await userService.remove(id);
        return res.status(200).json(isRemoved);
    }
    catch (error) {
        next(error);
    }
};
exports.remove = remove;
