import {Request, Response} from "express";
import {LineItem, ShopItem} from "../types";
import {CourseRecord} from "../records/course.record";
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export const checkOut = async(req: Request, res: Response) => {
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
        // success_url: 'http://localhost:5173/student/success',
        // cancel_url: 'http://localhost:5173/student/cancel',
        success_url: 'https://menager.networkmanager.pl/student/success',
        cancel_url: 'https://menager.networkmanager.pl/student/cancel',
    })

    res.json({
        url: session.url
    });

}