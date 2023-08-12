"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
require("express-async-errors");
const express_rate_limit_1 = require("express-rate-limit");
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 5 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
});
const errors_1 = require("./utils/errors");
require("./utils/db"); //połączenie z bazą danych
const course_1 = require("./routers/course");
const teacher_1 = require("./routers/teacher");
const student_1 = require("./routers/student");
const auth_1 = require("./routers/auth");
const app = express();
const corsOptions = {
    origin: ['http://localhost:5173', 'http://localhost:3000'],
};
app.use(cors(corsOptions));
app.use(limiter);
app.use(express.json());
app.use('/school-app/course', course_1.courseRouter);
app.use('/school-app/teacher', teacher_1.teacherRouter);
app.use('/school-app/student', student_1.studentRouter);
app.use('/school-app/auth', auth_1.authRouter);
app.use(errors_1.handleError);
app.listen(3001, '0.0.0.0', () => {
    console.log('Listening on http://localhost:3001');
});
//# sourceMappingURL=index.js.map