import {Request, Response, Router} from "express";

export const datoRouter = Router();

datoRouter
    .get('/', (req:Request, res:Response ) => {
        console.log(process.env.DATO_CMS_API_TOKEN)
        res.send({
            datoToken: process.env.DATO_CMS_API_TOKEN
        })

    })