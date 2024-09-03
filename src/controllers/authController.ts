import { NextFunction, Request, Response } from "express";

//Services
import AuthService from "../services/authService";
import ILoginDTO from "../dtos/loginDTO";
import { ITokenDTO } from "../dtos/tokenDTO";
import InvalidCredentialsException from "../services/exceptions/InvalidCredentialsException";

export const generateAccessToken = async (req: Request, res: Response) => {
    const authService = AuthService();
    try {
        let login: ILoginDTO = req.body;
        let tokenDTO: ITokenDTO = await authService.generateToken(login);
        let { token, expiresAt } = tokenDTO;
        return res.status(200).json({authenticated: true, token, expiresAt});
    } catch (error) {
        return res.status(500).json({ error });
    }
}

export const authenticateUserAccess = async (req: Request, res: Response, next: NextFunction) => {
    const authService = AuthService();
    try {
        let auth: any = req.headers['authorization'];
        if(!auth)
            throw new InvalidCredentialsException("Nenhum token de acesso informado");
        let token = auth.replace('Bearer ', '');
        var autheticated = authService.validateToken(token);

        if(!autheticated)
            throw new InvalidCredentialsException(token);

        next();
    } catch (error) {
        return res.status(403).json({ error });
    }
}

