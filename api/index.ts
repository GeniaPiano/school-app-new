import * as express from "express";

import * as cors from 'cors';
import 'express-async-errors';
import rateLimit from 'express-rate-limit'

const limiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 200,
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false,
})



import {handleError} from "./utils/errors";
import "./utils/db"; //połączenie z bazą danych

import {courseRouter} from "./routers/course";
import {teacherRouter} from "./routers/teacher";
import {studentRouter} from "./routers/student";
import {authRouter} from "./routers/auth";


const app = express();



const corsOptions = {
    origin: ['http://localhost:5173', 'http://localhost:3000', 'https://menager.networkmanager.pl'],
};

app.use(cors(corsOptions));
app.use(limiter)
app.use(express.urlencoded({ extended: true }))
app.use(express.json());



app.use('/course', courseRouter);
app.use('/teacher', teacherRouter);
app.use('/student', studentRouter);
app.use('/auth', authRouter);
app.use(handleError);

app.listen(3001, '0.0.0.0', () => {
    console.log('Listening on http://localhost:3001');
});

