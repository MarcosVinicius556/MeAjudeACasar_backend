import { IUser, UserModel } from "../models/User"
import Logger from "../../config/logger";

export default function UserService() {

    const findAll = async (): Promise<IUser[]> => {
        try {
            const users = await UserModel.find();    
            
            return users;
        } catch (error) {
            Logger.error("Não foi possível fazer a consulta de todos os usuários! Erro: " + error);
            throw new Error("Não foi possível fazer a consulta de todos os usuários! Erro: " + error);
        }
    }

    const findById = async (id: string): Promise<IUser> => {
        try {
            const user = await UserModel.findById(id);    
            if (!user) {
                throw new Error(`Usuário com ID ${id} não encontrado`);
            }
            return user;
        } catch (error) {
            Logger.error("Não foi possível fazer a consulta do usuário solicitado! Erro: " + error);
            throw new Error("Não foi possível fazer a consulta do usuário solicitado! Erro: " + error);
        }
    }

    const insert = async (user: IUser): Promise<IUser> => {
        try {
            const u = await UserModel.create(user);    
            return u;
        } catch (error) {
            Logger.error("Não foi possível salvar o usuário! Erro: " + error);
            throw new Error("Não foi possível salvar o usuário! Erro: " + error);
        }
    }

    const update = async (id: string, user: IUser): Promise<IUser> => {
        try {
            await findById(id); //Caso não exista, a outra função já irá lançar exceção    
            
            await UserModel.updateOne({ _id: id }, user);
            
            return user;
        } catch (error) {
            Logger.error("Não foi possível atualizar o usuário! Erro: " + error);
            throw new Error("Não foi possível atualizar o usuário! Erro: " + error);
        }
    }

    const remove = async (id: string): Promise<boolean> => {
        try {
            const user = await UserModel.findById(id);
            
            if(!user) {
                throw new Error(`Usuário com ID ${id} não encontrado`);
            }

            await user.deleteOne();
            
            return true;
        } catch (error) {
            Logger.error("Não foi possível remover o usuário! Erro: " + error);
            throw new Error("Não foi possível remover o usuário! Erro: " + error);
        }
    }
    
    return {
        findAll,
        findById,
        insert,
        update,
        remove
    }
}



