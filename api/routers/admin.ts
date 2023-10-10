import {Router} from "express";
import {updateAdmin} from "../controllers/admin";
import {verifyAdmin, verifyToken, verifyUser} from "../utils/verify";

export const adminRouter = Router();

adminRouter
    .patch('/', verifyAdmin, updateAdmin)

    .get('/check-authenticaion', verifyToken, (req, res, next) => {
        res.send('hello user, you are logged in!')
    })
    .get('/check-user/:id', verifyUser, (req, res, next)=> {
        res.send('Hello user you are logged in and you can delete your account.')
    })
    .get('/check-admin/:id', verifyAdmin, (req, res, next)=> {
        res.send('Hello user you are logged in and you are ADMIN.')
    })

