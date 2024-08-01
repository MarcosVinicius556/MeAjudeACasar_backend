import { GiftListModel, IGiftList } from "../models/GiftList";
import Logger from "../../config/logger";

export default function GiftListService() {

    const findAll = async (): Promise<IGiftList[]> => {
        try {
            const giftLists = await GiftListModel.find();    
            
            return giftLists;
        } catch (error) {
            Logger.error("Não foi possível fazer a consulta de todas as listas de presentes! Erro: " + error);
            throw new Error("Não foi possível fazer a consulta de todas as listas de presentes! Erro: " + error);
        }
    }

    const findById = async (id: string): Promise<IGiftList> => {
        try {
            const giftList = await GiftListModel.findById(id);    
            if (!giftList) {
                throw new Error(`Lista de presentes com ID ${id} não encontrado`);
            }
            return giftList;
        } catch (error) {
            Logger.error("Não foi possível fazer a consulta da lista de presentes solicitada! Erro: " + error);
            throw new Error("Não foi possível fazer a consulta da lista de presentes solicitada! Erro: " + error);
        }
    }

    const insert = async (giftList: IGiftList): Promise<IGiftList> => {
        try {
            const gf = await GiftListModel.create(giftList);    
            return gf;
        } catch (error) {
            Logger.error("Não foi possível salvar a lista de presentes! Erro: " + error);
            throw new Error("Não foi possível salvar a lista de presentes! Erro: " + error);
        }
    }

    const update = async (id: string, giftList: IGiftList): Promise<IGiftList> => {
        try {
            await findById(id);
            
            await GiftListModel.updateOne({ _id: id }, giftList);
            
            return giftList;
        } catch (error) {
            Logger.error("Não foi possível atualizar lista de presentes! Erro: " + error);
            throw new Error("Não foi possível atualizar lista de presentes! Erro: " + error);
        }
    }

    const remove = async (id: string): Promise<boolean> => {
        try {
            const giftList = await GiftListModel.findById(id);
            
            if(!giftList) {
                throw new Error(`Lista de presentes com ID ${id} não encontrada`);
            }

            await giftList.deleteOne();
            
            return true;
        } catch (error) {
            Logger.error("Não foi possível remover a lista de presentes! Erro: " + error);
            throw new Error("Não foi possível remover a lista de presentes! Erro: " + error);
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



