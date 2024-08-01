import { Request, Response } from "express";

//Services
import UserService from "../services/userService";

export const findAll = async (req: Request, res: Response) => {
    const userService = UserService();
    try {
        const users = await userService.findAllUsers();
        
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ error });
    }
}
