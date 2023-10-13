import {Request, Response, Router} from "express";
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export const shopRouter = Router();

shopRouter
   .get('/order', async(req: Request, res: Response) => {

      const stripeObj = await stripe.checkout.sessions.create({
         success_url: 'https://localhost:3001/success',
         cancel_url: 'https://localhost/cancel',
         payment_method_types: ['card', 'p24'],
         line_items: [
            {
                price: 'price_1O0gJ5CMIZdRR3DNosbJwqU6',
                quantity: 1,
            },
         ],
         mode: 'payment',
      });

      res.json(stripeObj)
   })
