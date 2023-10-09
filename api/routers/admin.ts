import {Router} from "express";
import {updateAdmin} from "../controllers/admin";
import {verifyAdmin, verifyToken, verifyUser} from "../utils/verify";
import {UserRecord} from "../records/user.record";
import {CourseRecord} from "../records/course.record";

export const adminRouter = Router();

adminRouter
    .patch('/', verifyAdmin, updateAdmin)

    .get('/check-authenticaion', verifyToken, (req, res, next) => {
        res.send('hello user, you are logged in!')
    })
    .get('/check-user/:id', verifyUser, (req, res, next)=> {
        res.send('Hello user you are logged in and you can delete your account.')
    })
    .get('/check-admin/:id', verifyAdmin, (req, res, next)=> {
        res.send('Hello user you are logged in and you are ADMIN.')
    })

    ///testujemy
    .get('/test', async(req, res) => {
        const result = await UserRecord.getUserByEmail('admin@admin.com');
        res.json(result)

    })
    .get('/get-courses', async(req, res) => {
        const result = await CourseRecord.listAllCoursesAvailable();
        res.json({
            test: result
        })
    })
