import {Request, Response, Router} from "express";
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export const shopRouter = Router();

shopRouter
   .get('/order', async(req: Request, res: Response) => {

      const stripeObj = await stripe.checkout.sessions.create({
         success_url: 'https://example.com/success',
         cancel_url: 'https://example.com/cancel',
         line_items: [
            {
                price: 'price_H5ggYwtDq4fbrJ',
                quantity: 2
            },
         ],
         mode: 'payment',
      });
   })
