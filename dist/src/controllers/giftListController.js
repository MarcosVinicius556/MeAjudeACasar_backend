"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.insert = exports.findById = exports.findAll = void 0;
//Services
const giftListService_1 = __importDefault(require("../services/giftListService"));
const findAll = async (req, res, next) => {
    const giftListService = (0, giftListService_1.default)();
    try {
        const giftList = await giftListService.findAll();
        return res.status(200).json(giftList);
    }
    catch (error) {
        next(error);
    }
};
exports.findAll = findAll;
const findById = async (req, res, next) => {
    const giftListService = (0, giftListService_1.default)();
    try {
        const id = req.params.id;
        const giftList = await giftListService.findById(id);
        return res.status(200).json(giftList);
    }
    catch (error) {
        next(error);
    }
};
exports.findById = findById;
const insert = async (req, res, next) => {
    const giftListService = (0, giftListService_1.default)();
    try {
        const newGiftList = req.body;
        const giftList = await giftListService.insert(newGiftList);
        return res.status(200).json(giftList);
    }
    catch (error) {
        next(error);
    }
};
exports.insert = insert;
const update = async (req, res, next) => {
    const giftListService = (0, giftListService_1.default)();
    try {
        const id = req.params.id;
        const newGiftList = req.body;
        const giftListUpdated = await giftListService.update(id, newGiftList);
        return res.status(200).json(giftListUpdated);
    }
    catch (error) {
        next(error);
    }
};
exports.update = update;
const remove = async (req, res, next) => {
    const giftListService = (0, giftListService_1.default)();
    try {
        const id = req.params.id;
        const isRemoved = await giftListService.remove(id);
        return res.status(200).json(isRemoved);
    }
    catch (error) {
        next(error);
    }
};
exports.remove = remove;
