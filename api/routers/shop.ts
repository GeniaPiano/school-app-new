import {Router} from "express";
import {checkOut} from "../controllers/shop";
export const shopRouter = Router();


shopRouter
    .post('/checkout', checkOut);


