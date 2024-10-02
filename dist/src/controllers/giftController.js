"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.insert = exports.findById = exports.findAll = void 0;
const giftService_1 = __importDefault(require("../services/giftService"));
const findAll = async (req, res, next) => {
    const giftService = (0, giftService_1.default)();
    try {
        const giftListId = req.params.giftListId;
        const gifts = await giftService.findAllByGiftList(giftListId);
        return res.status(200).json(gifts);
    }
    catch (error) {
        next(error);
    }
};
exports.findAll = findAll;
const findById = async (req, res, next) => {
    const giftService = (0, giftService_1.default)();
    try {
        const giftListId = req.params.giftListId;
        const giftId = req.params.giftId;
        const gift = await giftService.findById(giftListId, giftId);
        return res.status(200).json(gift);
    }
    catch (error) {
        next(error);
    }
};
exports.findById = findById;
const insert = async (req, res, next) => {
    const giftService = (0, giftService_1.default)();
    try {
        const giftListId = req.params.giftListId;
        const newGift = req.body;
        const gift = await giftService.insert(giftListId, newGift);
        return res.status(200).json(gift);
    }
    catch (error) {
        next(error);
    }
};
exports.insert = insert;
const update = async (req, res, next) => {
    const giftService = (0, giftService_1.default)();
    try {
        const giftListId = req.params.giftListId;
        const giftId = req.params.giftId;
        const newGift = req.body;
        const giftUpdated = await giftService.update(giftListId, giftId, newGift);
        return res.status(200).json(giftUpdated);
    }
    catch (error) {
        next(error);
    }
};
exports.update = update;
const remove = async (req, res, next) => {
    const giftService = (0, giftService_1.default)();
    try {
        const giftListId = req.params.giftListId;
        const giftId = req.params.giftId;
        const isRemoved = await giftService.remove(giftListId, giftId);
        return res.status(200).json(isRemoved);
    }
    catch (error) {
        next(error);
    }
};
exports.remove = remove;
