import { Request, Response } from "express";

//Services
import GiftListService from "../services/giftListService";
import { IGiftList } from "../models/GiftList";

export const findAll = async (req: Request, res: Response) => {
    const giftListService = GiftListService();
    try {
        const giftList = await giftListService.findAll();
        
        return res.status(200).json(giftList);
    } catch (error) {
        return res.status(500).json({ error });
    }
}

export const findById = async (req: Request, res: Response) => {
    const giftListService = GiftListService();
    try {
        const id = req.params.id;
        const giftList = await giftListService.findById(id);
        
        return res.status(200).json(giftList);
    } catch (error) {
        return res.status(500).json({ error });
    }
}

export const insert = async (req: Request, res: Response) => {
    const giftListService = GiftListService();
    try {
        const newGiftList: IGiftList = req.body;
        const giftList = await giftListService.insert(newGiftList);
        
        return res.status(200).json(giftList);
    } catch (error) {
        return res.status(500).json({ error });
    }
}

export const update = async (req: Request, res: Response) => {
    const giftListService = GiftListService();
    try {
        const id = req.params.id;
        const newGiftList: IGiftList = req.body;
        const giftListUpdated = await giftListService.update(id, newGiftList);
        
        return res.status(200).json(giftListUpdated);
    } catch (error) {
        return res.status(500).json({ error });
    }
}

export const remove = async (req: Request, res: Response) => {
    const giftListService = GiftListService();
    try {
        const id = req.params.id;
        const isRemoved = await giftListService.remove(id);
        
        return res.status(200).json(isRemoved);
    } catch (error) {
        return res.status(500).json({ error });
    }
}

