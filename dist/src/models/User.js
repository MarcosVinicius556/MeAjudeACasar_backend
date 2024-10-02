"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true },
    senha: { type: String, required: true },
    telefone: { type: String, required: true },
    role: { type: String, required: false },
    codigo_lista_presentes: { type: mongoose_1.Schema.Types.ObjectId, ref: 'gift_list', required: true }
}, {
    collection: 'users',
    timestamps: true
});
exports.UserModel = (0, mongoose_1.model)('User', userSchema);
