import * as express from "express";
import * as cors from 'cors';
import 'express-async-errors';
import rateLimit from 'express-rate-limit'
import * as cookieParser from "cookie-parser";
require('dotenv').config();

const limiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 200,
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false,
})


import {handleError} from "./utils/errors";
import "./utils/db"; //połączenie z bazą danych

//routers
import {courseRouter} from "./routers/course";
import {teacherRouter} from "./routers/teacher";
import {studentRouter} from "./routers/student";
import {authRouter} from "./routers/auth"
import {adminRouter} from "./routers/admin"
import {shopRouter} from "./routers/shop";
import {datoRouter} from "./routers/dato";


const app = express();
const corsOptions = {
    origin: ['http://localhost:5173', 'http://localhost:3000', 'https://menager.networkmanager.pl'],
};

//middlewares
app.use(cors(corsOptions));
//app.use(limiter)
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(cookieParser());

app.use('/course', courseRouter);
app.use('/teacher', teacherRouter);
app.use('/student', studentRouter);
app.use('/auth', authRouter);
app.use('/admin', adminRouter);
app.use('/shop', shopRouter);
app.use('/dato', datoRouter)
app.use(handleError);


app.listen(3001, '0.0.0.0', () => {
    console.log('Listening on http://localhost:3001');
});

