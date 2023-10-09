import * as jwt from "jsonwebtoken";
import {NextFunction, Request, Response} from "express";
import {ForbiddenError, NotAuthorizedError} from "./errors";

interface DecodedToken {
    id: string;
    role: 'admin' | 'teacher' | 'student';
}

declare global {
    namespace Express {
        interface Request {
            user?: DecodedToken; // Dodaj definicji dla user w obiekcie Request
        }
    }
}

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.access_token
       if (!token) {
        return next(new NotAuthorizedError('You are not authenticated!'))
    }


    try {
        req.user = jwt.verify(token, process.env.JWT) as DecodedToken;
        next();
    } catch (err) {
        if (err instanceof jwt.JsonWebTokenError) {
            return next(new ForbiddenError('Forbidden. Token not valid.'));
        } else {
            return next(err);
        }
    }
    }

export const verifyUser = (req: Request, res: Response, next: NextFunction) => {

     verifyToken(req, res,  ()=> {
         const id = req.user?.id;
         const role = req.user?.role;

         if (!id || !role) {
             return next(new ForbiddenError('You are not authorized!'));
         }

         if (req.user.id === req.params.id || req.user.role === 'admin') {
             next();
         } else {
           return next(new ForbiddenError('You are not authorized!'))
         }
     })
}

export const verifyAdmin = (req: Request, res: Response, next: NextFunction) => {
    verifyToken(req, res,  ()=> {
        const id = req.user?.id;
        const role = req.user?.role;

        if (!id || !role) {
            return next(new ForbiddenError('You are not authorized!'));
        }

        if (req.user?.role === 'admin') {
            next();
        } else {
            return next(new ForbiddenError('You are not authorized!'))
        }
    })
}

