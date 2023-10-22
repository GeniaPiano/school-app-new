import {Request, Response, Router} from "express";
import { resolve } from "path"
import {LineItem, ShopItem} from "../types";
import {CourseRecord} from "../records/course.record";
export const shopRouter = Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

shopRouter

   //  .get('/order', async(req: Request, res: Response) => {
   //
   //    const stripeObj = await stripe.checkout.sessions.create({
   //       success_url: 'https://localhost:5173/success',
   //       cancel_url: 'https://localhost/cancel',
   //       payment_method_types: ['card', 'p24'],
   //       line_items: [
   //          {
   //              price: 'price_1O0gJ5CMIZdRR3DNosbJwqU6',
   //              quantity: 1,
   //          },
   //       ],
   //       mode: 'payment',
   //    });
   //
   //    res.json(stripeObj)
   // })



    .post('/checkout', async(req: Request, res: Response)=>{
        const items: ShopItem[] = req.body.items
        console.log(items)
        const lineItems: Promise<LineItem>[] = items.map(async item => {
            const course = await CourseRecord.getOne(item.id)
            return {
                price: course.price === 50 ? process.env.STRIPE_50_PRICE : process.env.STRIPE_40_PRICE,
                quantity: item.quantity
            }
        });
        const resolvedLineItems = await Promise.all(lineItems);

        const session = await stripe.checkout.sessions.create({
            line_items: resolvedLineItems,
            mode: 'payment',
            success_url: 'http://localhost:5173/student/success',
            cancel_url: 'http://localhost:5173/student/cancel',
        })

        res.json({
            url: session.url
        });

    })

