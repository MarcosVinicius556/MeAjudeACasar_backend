"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUserAccess = exports.generateAccessToken = void 0;
//Services
const authService_1 = __importDefault(require("../services/authService"));
const InvalidCredentialsException_1 = __importDefault(require("../services/exceptions/InvalidCredentialsException"));
const generateAccessToken = async (req, res) => {
    const authService = (0, authService_1.default)();
    try {
        let login = req.body;
        let tokenDTO = await authService.generateToken(login);
        let { token, expiresAt } = tokenDTO;
        return res.status(200).json({ authenticated: true, token, expiresAt });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
};
exports.generateAccessToken = generateAccessToken;
const authenticateUserAccess = async (req, res, next) => {
    const authService = (0, authService_1.default)();
    try {
        let auth = req.headers['authorization'];
        if (!auth)
            throw new InvalidCredentialsException_1.default("Nenhum token de acesso informado");
        let token = auth.replace('Bearer ', '');
        let autheticated = authService.validateToken(token);
        if (!autheticated)
            throw new InvalidCredentialsException_1.default(token);
        next();
    }
    catch (error) {
        return res.status(403).json({ error });
    }
};
exports.authenticateUserAccess = authenticateUserAccess;
