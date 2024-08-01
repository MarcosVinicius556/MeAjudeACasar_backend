import { Request, Response } from "express";

//Services
import UserService from "../services/userService";
import { IUser } from "../models/User";

export const findAll = async (req: Request, res: Response) => {
    const userService = UserService();
    try {
        const users = await userService.findAllUsers();
        
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ error });
    }
}

export const findById = async (req: Request, res: Response) => {
    const userService = UserService();
    try {
        const id = req.params.id;
        const user = await userService.findById(id);
        
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ error });
    }
}

export const insert = async (req: Request, res: Response) => {
    const userService = UserService();
    try {
        const newUser: IUser = req.body;
        const users = await userService.insert(newUser);
        
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ error });
    }
}

export const update = async (req: Request, res: Response) => {
    const userService = UserService();
    try {
        const id = req.params.id;
        const newUser: IUser = req.body;
        const userUpdated = await userService.update(id, newUser);
        
        return res.status(200).json(userUpdated);
    } catch (error) {
        return res.status(500).json({ error });
    }
}

export const remove = async (req: Request, res: Response) => {
    const userService = UserService();
    try {
        const id = req.params.id;
        const isRemoved = await userService.remove(id);
        
        return res.status(200).json(isRemoved);
    } catch (error) {
        return res.status(500).json({ error });
    }
}

