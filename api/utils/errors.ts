import {NextFunction, Request, Response} from 'express'

export class ValidationError extends Error {}

export class NotFoundError extends  Error {}

export class NotAuthorizedError extends  Error {}

export class ForbiddenError extends  Error {}

export const handleError = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction): void => {

    console.error(err);


    if (err instanceof ValidationError ) {
        res.status(400).json({message: err.message})
    }
    if (err instanceof NotFoundError ) {
        res.status(404).json({message: err.message})
    }
    if (err instanceof ForbiddenError) {
        res.status(403).json({message: err.message})
    }
    if (err instanceof NotAuthorizedError) {
        res.status(401).json({message: err.message})
    }else {
        res.status(500).json({message: 'Sorry, please try again later.'})
    }
};




