"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GiftSchema = void 0;
const mongoose_1 = require("mongoose");
exports.GiftSchema = new mongoose_1.Schema({
    nome: { type: String, required: true },
    descricao: { type: String, required: false },
    url_foto: { type: String, required: true },
    status: { type: String, required: true },
    media_de_valores: { type: Number, required: false },
    possiveis_locais_de_compra: { type: [String], required: false },
    observado_por: { type: mongoose_1.Schema.Types.ObjectId, required: false, ref: 'user' },
    comprado_por: { type: mongoose_1.Schema.Types.ObjectId, required: false, ref: 'user' },
});
