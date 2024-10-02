import Logger from "../../config/logger";
import { IGift } from '../models/Gift';
import { GiftListModel, IGiftList } from '../models/GiftList';
import DatabaseException from "../models/exceptions/databaseException";
import ResourceNotFoundException from "../models/exceptions/resourceNotFoundException";
import GiftListService from './giftListService';

export default function GiftService() {

    const findAllByGiftList = async (giftListId: string): Promise<IGift[]> => {
        try {
            
            const giftList: IGiftList = await findGiftListById(giftListId);
            
            if(!giftList.presentes || giftList.presentes.length === 0)
                throw new ResourceNotFoundException("");

            return giftList.presentes;
        } catch (error: any) {
            Logger.error("Não foi possível fazer a consulta de todos os presentes cadastrados! Erro: " + error.message);
            if(error instanceof ResourceNotFoundException)
                throw error;
            
            throw new DatabaseException(error.message);
        }
    }

    const findById = async (giftListId: string, giftId: any): Promise<IGift> => {
        try {
            const giftList: IGiftList = await findGiftListById(giftListId);
            
            let gift: IGift | undefined = giftList.presentes.find((gift) => gift._id === giftId)
                    
            if(!gift)
                throw new ResourceNotFoundException(giftId);
            
            return gift;
        } catch (error: any) {
            Logger.error("Não foi possível fazer a consulta do presente solicitado! Erro: " + error.message);
            if(error instanceof ResourceNotFoundException)
                throw error;

            throw new DatabaseException(error.message);
        }
    }

    const insert = async (giftListId: string, gift: IGift): Promise<IGift> => {
        try {
            const giftList: IGiftList = await findGiftListById(giftListId);
            giftList.presentes.push(gift)

            await GiftListModel.updateOne({ _id: giftListId }, giftList);

            return gift;
        } catch (error: any) {
            Logger.error("Não foi possível salvar o presente! Erro: " + error.message);
            throw new DatabaseException(error.message);
        }
    }

    const update = async (giftListId: string, giftId: string, gift: IGift): Promise<IGift> => {
        try {
            await findById(giftListId, gift._id);

            const giftList: IGiftList = await findGiftListById(giftListId);
            const giftIndex = giftList.presentes.findIndex((g) => g._id === gift._id)

            giftList.presentes[giftIndex] = gift;

            if (giftIndex === -1) 
                throw new ResourceNotFoundException(gift._id);

            await GiftListModel.updateOne({ _id: giftListId }, giftList);

            return gift;
        } catch (error: any) {
            Logger.error("Não foi possível atualizar o presente! Erro: " + error.message);
            throw new DatabaseException(error.message);
        }
    }

    const remove = async (giftListId: string, giftId: string): Promise<boolean> => {
        try {
            await findById(giftListId, giftId);

            const giftList: IGiftList = await findGiftListById(giftListId);
            const giftIndex = giftList.presentes.findIndex((g) => g._id === giftId)

            if (giftIndex === -1) 
                throw new ResourceNotFoundException(giftId);

            giftList.presentes.splice(giftIndex);

            await GiftListModel.updateOne({ _id: giftListId }, giftList);

            return true;
        } catch (error: any) {
            Logger.error("Não foi possível remover o presente! Erro: " + error.message);
            if(error instanceof ResourceNotFoundException)
                throw error;

            throw new DatabaseException(error.message);
        }
    }

    const findGiftListById = async (giftListId: string): Promise<IGiftList> => {
        const giftListService = GiftListService();

        const giftList: IGiftList = await giftListService.findById(giftListId);
        if(!giftList)
            throw new ResourceNotFoundException("");

        return giftList;
    }
    
    
    return {
        findAllByGiftList,
        findById,
        insert,
        update,
        remove
    }
}



