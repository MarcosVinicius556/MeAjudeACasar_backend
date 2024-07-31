import { Request, Response } from "express";

//Models
import { UserModel } from "../models/User";

export const findAll = async (req: Request, res: Response) => {
    try {
        const users = await UserModel.find();
        
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ error });
    }
}
