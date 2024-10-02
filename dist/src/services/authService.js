"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AuthService;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//Exceptions
const InvalidArgumentsException_1 = __importDefault(require("./exceptions/InvalidArgumentsException"));
const InvalidCredentialsException_1 = __importDefault(require("./exceptions/InvalidCredentialsException"));
//Model
const User_1 = require("../models/User");
//Passar esta informação para dentro do arquivo de configuração ('.env')
const secret = "KJDSFHKJFHDSKJFHKJDSH";
function AuthService() {
    const generateToken = async (loginDTO) => {
        let { email, senha } = loginDTO;
        if (!email)
            throw new InvalidArgumentsException_1.default("É necessário informar um email para fazer login!");
        if (!senha)
            throw new InvalidArgumentsException_1.default("É necessário informar uma senha para fazer login!");
        let user = await User_1.UserModel.findOne({ email: email });
        if (!user)
            throw new InvalidCredentialsException_1.default({ email: email });
        let isCorrectPassword = await bcrypt_1.default.compare(senha, user.senha);
        if (!isCorrectPassword)
            throw new InvalidCredentialsException_1.default({ email: email, senha: senha });
        const expiresIn = '8h';
        const expirationTime = Math.floor(Date.now() / 1000) + 8 * 60 * 60;
        let token = jsonwebtoken_1.default.sign({
            id: user._id,
            email: user.email,
            role: user.role
        }, secret, {
            expiresIn: expiresIn
        });
        return {
            token: token,
            expiresAt: new Date(expirationTime * 1000)
        };
    };
    const validateToken = (token) => {
        try {
            const decoded = jsonwebtoken_1.default.verify(token, secret);
            return decoded;
        }
        catch (error) {
            throw new InvalidCredentialsException_1.default(token);
        }
    };
    return {
        generateToken,
        validateToken
    };
}
