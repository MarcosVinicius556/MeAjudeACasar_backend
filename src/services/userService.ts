import { IUser, UserModel } from "../models/User"
import Logger from "../../config/logger";

export default function UserService() {

    const findAllUsers = async (): Promise<IUser[]> => {
        try {
            const users = UserModel.find();    
            
            return users;
        } catch (error) {
            Logger.error("Não foi possível fazer a consulta de todos os usuários! Erro: " + error);
            throw new Error("Não foi possível fazer a consulta de todos os usuários! Erro: " + error);
        }
        
    }
    
    
    return {
        findAllUsers
    }
}



