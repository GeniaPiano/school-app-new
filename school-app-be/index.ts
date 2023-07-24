import * as express from "express";
import * as cors from 'cors';
import 'express-async-errors'; // ważna kolejność
import {giftRouter} from "./routers/gift";

import {handleError} from "./utils/errors";
import "./utils/db";
import {courseRouter} from "./routers/course";
import {teacherRouter} from "./routers/teacher";
import {studentRouter} from "./routers/student"; //od razu łączymy się z baza danych

const app = express();

app.use(cors({
    origin: 'http://localhost:3000'
}))
app.use(express.json()); // Content-type: application/json
// app.use('/', homeRouter);
app.use('/course', courseRouter);
app.use('/teacher', teacherRouter);
app.use('/student', studentRouter);
app.use(handleError);

app.listen(3001, '0.0.0.0', () => {
    console.log('Listening on http://localhost:3001');
});

