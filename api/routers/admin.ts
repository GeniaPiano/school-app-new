import {Router} from "express";
import {updateAdmin} from "../controllers/admin";
import {verifyToken} from "../utils/verify";

export const adminRouter = Router();

adminRouter
    .patch('/', updateAdmin)

    .get('/check-authenticaion', verifyToken, (req, res, next) => {
        res.send('hello user, you are logged in!')
    })
    .get('/check-user/:id', verifyToken, (req, res, next)=> {
        res.send('Hello user you are logged in and you can delete your account.')
    })
