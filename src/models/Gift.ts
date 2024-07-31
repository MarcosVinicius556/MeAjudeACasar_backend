import mongoose, { Document, Schema } from "mongoose";

export interface IGift extends Document {
    nome: string;
    descricao: string;
    url_foto: string;
    status: string;
    media_de_valores: string
    possiveis_locais_de_compra: string[];
    observador_por: mongoose.Schema.Types.ObjectId[];
    comprado_por: mongoose.Schema.Types.ObjectId;
}

export const GiftSchema: Schema = new Schema({
    nome: { type: String, required: true },
    descricao: { type: String, required: false },
    url_foto: { type: String, required: true },
    status: { type: String, required: true },
    media_de_valores: { type: Number, required: false },
    possiveis_locais_de_compra: { type: [String], required: false },
    observado_por: { type: Schema.Types.ObjectId, required: false, ref: 'user' },
    comprado_por: { type: Schema.Types.ObjectId, required: false, ref: 'user' },
});