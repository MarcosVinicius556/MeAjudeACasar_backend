import { IUser, UserModel } from "../models/User"
import Logger from "../../config/logger";
import bcrypt from 'bcrypt';
import DatabaseException from "../models/exceptions/databaseException";
import ResourceNotFoundException from "../models/exceptions/resourceNotFoundException";

export default function UserService() {

    const findAll = async (): Promise<IUser[]> => {
        try {
            const users = await UserModel.find();    
            if(!users || users.length === 0)
                throw new ResourceNotFoundException("");
            
            return users;
        } catch (error: any) {
            Logger.error("Não foi possível fazer a consulta de todos os usuários! Erro: " + error.message);
            if(error instanceof ResourceNotFoundException)
                throw error;
            
            throw new DatabaseException(error.message);
        }
    }

    const findById = async (id: string): Promise<IUser> => {
        try {
            const user = await UserModel.findById(id, '-senha');    
            if (!user) {
                throw new ResourceNotFoundException(id);
            }
            return user;
        } catch (error: any) {
            Logger.error("Não foi possível fazer a consulta do usuário solicitado! Erro: " + error.message);
            if(error instanceof ResourceNotFoundException)
                throw error;

            throw new DatabaseException(error.message);
        }
    }

    const insert = async (user: IUser): Promise<IUser> => {
        try {
            const salt = await bcrypt.genSalt(12);
            const passwordHash = await bcrypt.hash(user.senha, salt);

            user.senha = passwordHash;
            const u = await UserModel.create(user);    
            return u;
        } catch (error: any) {
            Logger.error("Não foi possível salvar o usuário! Erro: " + error.message);
            throw new DatabaseException(error.message);
        }
    }

    const update = async (id: string, user: IUser): Promise<IUser> => {
        try {
            await findById(id);
            
            await UserModel.updateOne({ _id: id }, user);
            
            return user;
        } catch (error: any) {
            Logger.error("Não foi possível atualizar o usuário! Erro: " + error.message);
            if(error instanceof ResourceNotFoundException)
                throw error;

            throw new DatabaseException(error.message);
        }
    }

    const remove = async (id: string): Promise<boolean> => {
        try {
            const user = await UserModel.findById(id);
            
            if(!user) {
                throw new ResourceNotFoundException(id);
            }

            await user.deleteOne();
            
            return true;
        } catch (error: any) {
            Logger.error("Não foi possível remover o usuário! Erro: " + error.message);
            if(error instanceof ResourceNotFoundException)
                throw error;

            throw new DatabaseException(error.message);
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



