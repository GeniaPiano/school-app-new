import {Request, Response, Router} from "express";
import { resolve } from "path"
export const shopRouter = Router();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

shopRouter
    .get('/', (req: Request, res: Response) => {
        const path = resolve(process.env.STATIC_DIR + "/index.html");
        res.sendFile(path);
    })

    .get('/config', (req: Request, res: Response) => {
            res.send({
                publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
            });
        })

    .post('/create-payment-intent',async(req: Request, res: Response) => {
        try {
            const paymentIntent = await stripe.paymentIntents.create({
                currency: 'eur',
                amount: 1,
                payment_method_types: ['card', 'p24'],
            })
            res.send({clientSecret: paymentIntent.client_secret})
        } catch (err) {
            return res.status(400).send({error: {
                    message: err.message,
                } })
        }
    })

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
