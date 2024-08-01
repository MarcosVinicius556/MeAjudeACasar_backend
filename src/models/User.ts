import mongoose, { model, Schema } from 'mongoose';

export interface IUser extends Document {
    nome: string;
    email: string;
    senha: string;
    telefone: string;
    role: string;
    codigo_lista_presentes: mongoose.Schema.Types.ObjectId;
    criado_em: Date;
}

const userSchema: Schema = new Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true },
    senha: { type: String, required: true },
    telefone: { type: String, required: true },
    role: { type: String, required: false },
    codigo_lista_presentes: { type: Schema.Types.ObjectId, ref: 'gift_list', required: true }
    },
    {
        collection: 'users',
        timestamps: true
    }
)

export const UserModel = model<IUser>('User', userSchema);