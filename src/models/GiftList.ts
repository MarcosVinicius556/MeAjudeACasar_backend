import mongoose, { Schema } from "mongoose";
import { GiftSchema, IGift } from "./Gift";

export interface IGiftList extends Document {
    permite_ver_movimentacao_indisponivel: boolean;
    permite_ver_movimentacao_observacao: boolean;
    criado_em: Date;
    presentes: IGift[];
}

const GiftListSchema: Schema = new Schema({
    permite_ver_movimentacao_indisponivel: { type: Boolean, required: true },
    permite_ver_movimentacao_observacao: { type: Boolean, required: true },
    presentes: [GiftSchema]
    },
    {
        collection: 'gift_list',
        timestamps: true
    }
);

export const GiftListModel = mongoose.model<IGiftList>('gift_list', GiftListSchema);