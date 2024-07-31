import { Request, Response, json } from "express";

export const testRouteConfig = async (req: Request, res: Response) => {
    console.log('Parece que deu certo');
    return res.status(201).json({ message: "Parece que deu certo a rotinha...." }); 
}