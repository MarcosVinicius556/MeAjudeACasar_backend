import ILoginDTO from "../dtos/loginDTO";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

//Exceptions
import InvalidArgumentException from "./exceptions/InvalidArgumentsException";
import InvalidCredentialsException from "./exceptions/InvalidCredentialsException";

//Model
import { UserModel } from "../models/User";
import { ITokenDTO } from "../dtos/tokenDTO";

//Passar esta informação para dentro do arquivo de configuração ('.env')
const secret = "KJDSFHKJFHDSKJFHKJDSH";

export default function AuthService() {

    const generateToken = async (loginDTO: ILoginDTO): Promise<ITokenDTO> => {
        let{ email, senha } = loginDTO;
        if(!email) throw new InvalidArgumentException("É necessário informar um email para fazer login!");
        if(!senha) throw new InvalidArgumentException("É necessário informar uma senha para fazer login!");

        let user = await UserModel.findOne({ email: email });

        if(!user) throw new InvalidCredentialsException({ email: email });

        let isCorrectPassword = await bcrypt.compare(senha, user.senha);
        
        if(!isCorrectPassword) throw new InvalidCredentialsException({ email: email, senha: senha });

        const expiresIn = '8h';
        const expirationTime = Math.floor(Date.now() / 1000) + 8 * 60 * 60;

        let token = jwt.sign(
            {
                id: user._id,
                email: user.email,
                role: user.role
            },
            secret,
            {
                expiresIn: expiresIn
            }
        );
        return {
            token: token,
            expiresAt: new Date(expirationTime * 1000)
        };
    }

    const validateToken = (token: string) => {
        try {
            const decoded = jwt.verify(token, secret);
            return decoded;
        } catch (error) {
            throw new InvalidCredentialsException(token);
        }
    }

    return {
        generateToken,
        validateToken
    }

}