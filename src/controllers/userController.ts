import { NextFunction, Request, Response } from "express";

//Services
import UserService from "../services/userService";
import { IUser } from "../models/User";

export const findAll = async (req: Request, res: Response, next: NextFunction) => {
    const userService = UserService();
    try {
        const users = await userService.findAll();
        
        return res.status(200).json(users);
    } catch (error) {
        next(error);
    }
}

export const findById = async (req: Request, res: Response, next: NextFunction) => {
    const userService = UserService();
    try {
        const id = req.params.id;
        const user = await userService.findById(id);
        
        return res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}

export const insert = async (req: Request, res: Response, next: NextFunction) => {
    const userService = UserService();
    try {
        const newUser: IUser = req.body;
        const user = await userService.insert(newUser);
        
        return res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}

export const update = async (req: Request, res: Response, next: NextFunction) => {
    const userService = UserService();
    try {
        const id = req.params.id;
        const newUser: IUser = req.body;
        const userUpdated = await userService.update(id, newUser);
        
        return res.status(200).json(userUpdated);
    } catch (error) {
        next(error);
    }
}

export const remove = async (req: Request, res: Response, next: NextFunction) => {
    const userService = UserService();
    try {
        const id = req.params.id;
        const isRemoved = await userService.remove(id);
        
        return res.status(200).json(isRemoved);
    } catch (error) {
        next(error);
    }
}

