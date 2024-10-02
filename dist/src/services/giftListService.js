"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GiftListService;
const GiftList_1 = require("../models/GiftList");
const logger_1 = __importDefault(require("../../config/logger"));
const resourceNotFoundException_1 = __importDefault(require("../models/exceptions/resourceNotFoundException"));
const databaseException_1 = __importDefault(require("../models/exceptions/databaseException"));
function GiftListService() {
    const findAll = async () => {
        try {
            const giftLists = await GiftList_1.GiftListModel.find();
            if (!giftLists || giftLists.length === 0)
                throw new resourceNotFoundException_1.default("");
            return giftLists;
        }
        catch (error) {
            logger_1.default.error("Não foi possível fazer a consulta de todas as listas de presentes! Erro: " + error.message);
            if (error instanceof resourceNotFoundException_1.default)
                throw error;
            throw new databaseException_1.default(error.message);
        }
    };
    const findById = async (id) => {
        try {
            const giftList = await GiftList_1.GiftListModel.findById(id);
            if (!giftList) {
                throw new resourceNotFoundException_1.default(id);
            }
            return giftList;
        }
        catch (error) {
            logger_1.default.error("Não foi possível fazer a consulta da lista de presentes solicitada! Erro: " + error.message);
            if (error instanceof resourceNotFoundException_1.default)
                throw error;
            throw new databaseException_1.default(error.message);
        }
    };
    const insert = async (giftList) => {
        try {
            const gf = await GiftList_1.GiftListModel.create(giftList);
            return gf;
        }
        catch (error) {
            logger_1.default.error("Não foi possível salvar a lista de presentes! Erro: " + error.message);
            throw new databaseException_1.default(error.message);
        }
    };
    const update = async (id, giftList) => {
        try {
            await findById(id);
            await GiftList_1.GiftListModel.updateOne({ _id: id }, giftList);
            return giftList;
        }
        catch (error) {
            logger_1.default.error("Não foi possível atualizar lista de presentes! Erro: " + error.message);
            if (error instanceof resourceNotFoundException_1.default)
                throw error;
            throw new databaseException_1.default(error.message);
        }
    };
    const remove = async (id) => {
        try {
            const giftList = await GiftList_1.GiftListModel.findById(id);
            if (!giftList)
                throw new resourceNotFoundException_1.default(id);
            await giftList.deleteOne();
            return true;
        }
        catch (error) {
            logger_1.default.error("Não foi possível remover a lista de presentes! Erro: " + error);
            if (error instanceof resourceNotFoundException_1.default)
                throw error;
            throw new databaseException_1.default(error.message);
        }
    };
    return {
        findAll,
        findById,
        insert,
        update,
        remove
    };
}
