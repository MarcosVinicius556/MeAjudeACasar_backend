"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = UserService;
const User_1 = require("../models/User");
const logger_1 = __importDefault(require("../../config/logger"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const databaseException_1 = __importDefault(require("../models/exceptions/databaseException"));
const resourceNotFoundException_1 = __importDefault(require("../models/exceptions/resourceNotFoundException"));
function UserService() {
    const findAll = async () => {
        try {
            const users = await User_1.UserModel.find();
            if (!users || users.length === 0)
                throw new resourceNotFoundException_1.default("");
            return users;
        }
        catch (error) {
            logger_1.default.error("Não foi possível fazer a consulta de todos os usuários! Erro: " + error.message);
            if (error instanceof resourceNotFoundException_1.default)
                throw error;
            throw new databaseException_1.default(error.message);
        }
    };
    const findById = async (id) => {
        try {
            const user = await User_1.UserModel.findById(id, '-senha');
            if (!user) {
                throw new resourceNotFoundException_1.default(id);
            }
            return user;
        }
        catch (error) {
            logger_1.default.error("Não foi possível fazer a consulta do usuário solicitado! Erro: " + error.message);
            if (error instanceof resourceNotFoundException_1.default)
                throw error;
            throw new databaseException_1.default(error.message);
        }
    };
    const insert = async (user) => {
        try {
            const salt = await bcrypt_1.default.genSalt(12);
            const passwordHash = await bcrypt_1.default.hash(user.senha, salt);
            user.senha = passwordHash;
            const u = await User_1.UserModel.create(user);
            return u;
        }
        catch (error) {
            logger_1.default.error("Não foi possível salvar o usuário! Erro: " + error.message);
            throw new databaseException_1.default(error.message);
        }
    };
    const update = async (id, user) => {
        try {
            await findById(id);
            await User_1.UserModel.updateOne({ _id: id }, user);
            return user;
        }
        catch (error) {
            logger_1.default.error("Não foi possível atualizar o usuário! Erro: " + error.message);
            if (error instanceof resourceNotFoundException_1.default)
                throw error;
            throw new databaseException_1.default(error.message);
        }
    };
    const remove = async (id) => {
        try {
            const user = await User_1.UserModel.findById(id);
            if (!user) {
                throw new resourceNotFoundException_1.default(id);
            }
            await user.deleteOne();
            return true;
        }
        catch (error) {
            logger_1.default.error("Não foi possível remover o usuário! Erro: " + error.message);
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
