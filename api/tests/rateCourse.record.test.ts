import {RateCourseRecord} from "../records/rateCourse.record";
import {pool} from "../utils/db";
import {v4 as uuid} from "uuid";



afterAll(async () => {
    await pool.end();
})

const id = '0wer8ffy0nwe8r7t9nwi6eourygveravf'

test('CourseRateRecord returns correct data', async () => {
    try {
        const rate = await RateCourseRecord.findOne(id);
        expect(rate.student_id).toBeDefined();
    } catch (err) {
        console.log(err)
    }
})

test('Course return inserted record', async () => {
    try {
        const rate = new RateCourseRecord({
            id: uuid(),
            course_id: "4d4c4843-ef6d-4523-8dce-9073c809471c",
            stars: 5,
            student_id: "535bb083-4291-4962-bb63-03496a82b73a",
            opinion: "LOVE IT!!! I'll be training jiu jitsu only here! ",
            async insert(): Promise<string> {
                return Promise.resolve("");
            }, async update(): Promise<void> {
                return Promise.resolve(undefined);
            }
        })

        await rate.insert();
        const inserted = await RateCourseRecord.findOne(id)
        expect(rate.stars).toBeLessThan(6);
        expect(rate.stars).toBeGreaterThanOrEqual(0);
        expect(inserted.opinion).toBeDefined();
    } catch (err)  {
        console.log(err)
    }
})
