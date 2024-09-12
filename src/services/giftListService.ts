import { GiftListModel, IGiftList } from "../models/GiftList";
import Logger from "../../config/logger";
import ResourceNotFoundException from "../models/exceptions/resourceNotFoundException";
import DatabaseException from "../models/exceptions/databaseException";

export default function GiftListService() {

    const findAll = async (): Promise<IGiftList[]> => {
        try {
            const giftLists = await GiftListModel.find();    
            if(!giftLists || giftLists.length === 0)
                throw new ResourceNotFoundException("");
            return giftLists;
        } catch (error: any) {
            Logger.error("Não foi possível fazer a consulta de todas as listas de presentes! Erro: " + error.message);
            if(error instanceof ResourceNotFoundException)
                throw error;

            throw new DatabaseException(error.message);
        }
    }

    const findById = async (id: string): Promise<IGiftList> => {
        try {
            const giftList = await GiftListModel.findById(id);    
            if (!giftList) {
                throw new ResourceNotFoundException(id);
            }
            return giftList;
        } catch (error: any) {
            Logger.error("Não foi possível fazer a consulta da lista de presentes solicitada! Erro: " + error.message);
            if(error instanceof ResourceNotFoundException)
                throw error;

            throw new DatabaseException(error.message);
        }
    }

    const insert = async (giftList: IGiftList): Promise<IGiftList> => {
        try {
            const gf = await GiftListModel.create(giftList);    
            return gf;
        } catch (error: any) {
            Logger.error("Não foi possível salvar a lista de presentes! Erro: " + error.message);
            throw new DatabaseException(error.message);
        }
    }

    const update = async (id: string, giftList: IGiftList): Promise<IGiftList> => {
        try {
            await findById(id);
            
            await GiftListModel.updateOne({ _id: id }, giftList);
            
            return giftList;
        } catch (error: any) {
            Logger.error("Não foi possível atualizar lista de presentes! Erro: " + error.message);
            if(error instanceof ResourceNotFoundException)
                throw error;

            throw new DatabaseException(error.message);
        }
    }

    const remove = async (id: string): Promise<boolean> => {
        try {
            const giftList = await GiftListModel.findById(id);
            
            if(!giftList)
                throw new ResourceNotFoundException(id);

            await giftList.deleteOne();
            
            return true;
        } catch (error: any) {
            Logger.error("Não foi possível remover a lista de presentes! Erro: " + error);
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



