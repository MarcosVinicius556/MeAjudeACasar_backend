import { NextFunction, Request, Response } from "express";

//Services
import { IGift } from "../models/Gift";
import GiftService from "../services/giftService";

export const findAll = async (req: Request, res: Response, next: NextFunction) => {
    const giftService = GiftService();
    try {
        const giftListId = req.params.giftListId;
        const gifts = await giftService.findAllByGiftList(giftListId);
        
        return res.status(200).json(gifts);
    } catch (error) {
        next(error);
    }
}

export const findById = async (req: Request, res: Response, next: NextFunction) => {
    const giftService = GiftService();
    try {
        const giftListId = req.params.giftListId;
        const giftId = req.params.giftId;

        const gift = await giftService.findById(giftListId, giftId);
        
        return res.status(200).json(gift);
    } catch (error) {
        next(error);
    }
}

export const insert = async (req: Request, res: Response, next: NextFunction) => {
    const giftService = GiftService();
    try {
        const giftListId = req.params.giftListId;
        const newGift: IGift = req.body;
        const gift = await giftService.insert(giftListId, newGift);
        
        return res.status(200).json(gift);
    } catch (error) {
        next(error);
    }
}

export const update = async (req: Request, res: Response, next: NextFunction) => {
    const giftService = GiftService();
    try {
        const giftListId = req.params.giftListId;
        const giftId = req.params.giftId;
        const newGift: IGift = req.body;

        const giftUpdated = await giftService.update(giftListId, giftId, newGift);
        
        return res.status(200).json(giftUpdated);
    } catch (error) {
        next(error);
    }
}

export const remove = async (req: Request, res: Response, next: NextFunction) => {
    const giftService = GiftService();
    try {
        const giftListId = req.params.giftListId;
        const giftId = req.params.giftId;
        const isRemoved = await giftService.remove(giftListId, giftId);
        
        return res.status(200).json(isRemoved);
    } catch (error) {
        next(error);
    }
}

