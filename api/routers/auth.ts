import { Router} from "express";
import {checkToken, login, logout, register} from "../controllers/auth";

export const authRouter = Router();


authRouter
    .post('/login', login)
    .get('/me', checkToken)
    .post ('/logout', logout)
    .post ('/register', register)







