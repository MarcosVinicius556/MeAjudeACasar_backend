import { Request, Response, NextFunction } from "express"
import StandardError from "../controllers/exceptions/standardError"
import InvalidArgumentException from "../services/exceptions/InvalidArgumentsException";
import InvalidCredentialsException from "../services/exceptions/InvalidCredentialsException";
import ResourceNotFoundException from "../models/exceptions/resourceNotFoundException";

const ExceptionHandler = <E extends Error> (error: E, 
                                            req: Request, 
                                            res: Response,
                                            next: NextFunction) => {
    const errorObject = findAndMountExceptionMessage(error);
    console.log('chegou aqui 2')
    console.log(error)
    return res.status(errorObject.statusCode)
              .json(errorObject);
}

const findAndMountExceptionMessage = <E extends Error> (error: E): StandardError<E> => {
    let errorObject: StandardError<E> = new StandardError(error, 500);

    if(error instanceof InvalidArgumentException)
        return errorObject = new StandardError(error, 500);

    if(error instanceof InvalidCredentialsException)
        return errorObject = new StandardError(error, 403);

    if(error instanceof ResourceNotFoundException)
        return errorObject = new StandardError(error, 404);

    return errorObject
}

export default ExceptionHandler;