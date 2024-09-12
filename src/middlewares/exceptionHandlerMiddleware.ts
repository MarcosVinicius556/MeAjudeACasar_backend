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
    return res.status(errorObject.statusCode)
              .json(errorObject);
}

const findAndMountExceptionMessage = <E extends Error> (error: E): StandardError<E> => {
    if(error instanceof InvalidArgumentException)
        return new StandardError(error, 500);

    if(error instanceof InvalidCredentialsException)
        return new StandardError(error, 403);

    if(error instanceof ResourceNotFoundException)
        return new StandardError(error, 404);

    return new StandardError(error, 500);
}

export default ExceptionHandler;