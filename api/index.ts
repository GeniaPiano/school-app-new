import * as express from "express";
import * as cors from 'cors';
import 'express-async-errors';
import * as cookieParser from "cookie-parser";
require('dotenv').config();


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

app.use('/api/course', courseRouter);
app.use('/api/teacher', teacherRouter);
app.use('/api/student', studentRouter);
app.use('/api/auth', authRouter);
app.use('/api/admin', adminRouter);
app.use('/api/shop', shopRouter);
app.use('/api/dato', datoRouter)
app.use(handleError);


app.listen(3001, '0.0.0.0', () => {
    console.log('Listening on http://localhost:3001');
});

