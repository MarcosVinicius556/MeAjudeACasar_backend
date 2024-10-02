"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GiftService;
const logger_1 = __importDefault(require("../../config/logger"));
const GiftList_1 = require("../models/GiftList");
const databaseException_1 = __importDefault(require("../models/exceptions/databaseException"));
const resourceNotFoundException_1 = __importDefault(require("../models/exceptions/resourceNotFoundException"));
const giftListService_1 = __importDefault(require("./giftListService"));
function GiftService() {
    const findAllByGiftList = async (giftListId) => {
        try {
            const giftList = await findGiftListById(giftListId);
            if (!giftList.presentes || giftList.presentes.length === 0)
                throw new resourceNotFoundException_1.default("");
            return giftList.presentes;
        }
        catch (error) {
            logger_1.default.error("Não foi possível fazer a consulta de todos os presentes cadastrados! Erro: " + error.message);
            if (error instanceof resourceNotFoundException_1.default)
                throw error;
            throw new databaseException_1.default(error.message);
        }
    };
    const findById = async (giftListId, giftId) => {
        try {
            const giftList = await findGiftListById(giftListId);
            let gift = giftList.presentes.find((gift) => gift._id.toString() === giftId);
            if (!gift)
                throw new resourceNotFoundException_1.default(giftId);
            return gift;
        }
        catch (error) {
            logger_1.default.error("Não foi possível fazer a consulta do presente solicitado! Erro: " + error.message);
            if (error instanceof resourceNotFoundException_1.default)
                throw error;
            throw new databaseException_1.default(error.message);
        }
    };
    const insert = async (giftListId, gift) => {
        try {
            const giftList = await findGiftListById(giftListId);
            giftList.presentes.push(gift);
            await GiftList_1.GiftListModel.updateOne({ _id: giftListId }, giftList);
            return gift;
        }
        catch (error) {
            logger_1.default.error("Não foi possível salvar o presente! Erro: " + error.message);
            throw new databaseException_1.default(error.message);
        }
    };
    const update = async (giftListId, giftId, gift) => {
        try {
            const giftList = await findGiftListById(giftListId);
            console.log(giftList);
            const giftIndex = giftList.presentes.findIndex((g) => g._id.toString() === giftId);
            giftList.presentes[giftIndex] = gift;
            if (giftIndex === -1)
                throw new resourceNotFoundException_1.default(gift._id);
            await GiftList_1.GiftListModel.updateOne({ _id: giftListId }, giftList);
            return gift;
        }
        catch (error) {
            logger_1.default.error("Não foi possível atualizar o presente! Erro: " + error.message);
            throw new databaseException_1.default(error.message);
        }
    };
    const remove = async (giftListId, giftId) => {
        try {
            const giftList = await findGiftListById(giftListId);
            const giftIndex = giftList.presentes.findIndex((g) => g._id.toString() === giftId);
            if (giftIndex === -1)
                throw new resourceNotFoundException_1.default(giftId);
            giftList.presentes.splice(giftIndex);
            await GiftList_1.GiftListModel.updateOne({ _id: giftListId }, giftList);
            return true;
        }
        catch (error) {
            logger_1.default.error("Não foi possível remover o presente! Erro: " + error.message);
            if (error instanceof resourceNotFoundException_1.default)
                throw error;
            throw new databaseException_1.default(error.message);
        }
    };
    const findGiftListById = async (giftListId) => {
        const giftListService = (0, giftListService_1.default)();
        const giftList = await giftListService.findById(giftListId);
        if (!giftList)
            throw new resourceNotFoundException_1.default("");
        return giftList;
    };
    return {
        findAllByGiftList,
        findById,
        insert,
        update,
        remove
    };
}
