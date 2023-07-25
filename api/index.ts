import * as express from "express";
import * as cors from 'cors';
import 'express-async-errors';
import {handleError} from "./utils/errors";
import "./utils/db"; //połączenie z bazą danych

import {courseRouter} from "./routers/course";
import {teacherRouter} from "./routers/teacher";
import {studentRouter} from "./routers/student";
import {authRouter} from "./routers/auth"; //od razu łączymy się z baza danych

const app = express();

app.use(cors({
    origin: 'http://localhost:3000'
}))
app.use(express.json()); // Content-type: application/json
app.use('/school-app/course', courseRouter);
app.use('/school-app/teacher', teacherRouter);
app.use('/school-app/student', studentRouter);
app.use('/school-app/auth', authRouter);
app.use(handleError);

app.listen(3001, '0.0.0.0', () => {
    console.log('Listening on http://localhost:3001');
});

