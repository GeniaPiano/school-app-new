import {NextFunction, Request, Response} from 'express'

export class ValidationError extends Error {}

export class NotFoundError extends  Error {}

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
    } else {
        res.status(500).json({message: 'Sorry, please try again later.'})
    }

};

//
//
// export class HttpError extends Error {
//     code: number;
//     constructor(code: number, message: string) {
//         super(message);
//         this.code = code;
//     }
// }
//
// export const handleError = (
//     err: Error,
//     req: Request,
//     res: Response,
//     next: NextFunction
// ): void => {
//     console.error(err);
//
//     if (err instanceof HttpError) {
//         res.status(err.code).json({ message: err.message });
//     } else {
//         res.status(500).json({ message: 'Sorry, please try again later.' });
//     }
// };



