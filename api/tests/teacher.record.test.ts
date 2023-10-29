import {pool} from "../utils/db";
import {TeacherRecord} from "../records/teacher.record";

afterAll(async () => {
    await pool.end();
});

const id = '1b22379a-05e8-41dc-a7da-6a9aac8096bc'

test('TeacherRecord returns correct data from database', async () => {
    try {
        const teacher = await TeacherRecord.getOne(id)
        expect(teacher).toBeDefined();
    } catch (err) {
        console.log(err)
    }
})

test('TeacherRecord returns correct data from database', async () => {
    try {
            const teacher = await TeacherRecord.getOne(id)
            expect(teacher.name).toBe('Wanda')
         } catch (err) {
        console.log (err)
    }
})