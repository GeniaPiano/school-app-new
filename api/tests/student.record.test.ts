import {StudentRecord} from "../records/student.record";
import {pool} from "../utils/db";

afterAll(async () => {
    await pool.end();
})

test('StudentRecord returns correct data from database', async () => {
    try {
        const student = await StudentRecord.getOne('535bb083-4291-4962-bb63-03496a82b73a')
        expect(student.name).toBe('Anna')
    } catch (err) {
        console.log(err)
    }
})

test('StudentRecord returns created record', async () => {
    try {
        const student = new StudentRecord({
            async delete(id: string): Promise<void> {
                return Promise.resolve(undefined);
            }, async insert(): Promise<string> {
                return Promise.resolve("");
            }, async insertCourseForStudent(course_id: string): Promise<void> {
                return Promise.resolve(undefined);
            }, async removeAllCourses(): Promise<void> {
                return Promise.resolve(undefined);
            }, async removeOneCourseFromStudent(course_id: string): Promise<void> {
                return Promise.resolve(undefined);
            }, async updateNameAndEmail(): Promise<void> {
                return Promise.resolve(undefined);
            },
            name: 'Adrian',
            last_name: 'Kossakowski',
            email: 'adrian@gmail.com',
            password: 'adrian123',
            role: 'student'
        })
        await student.insert();
        expect(student.name).toBe('Adrian');
        expect(student.role).toBe('student');



    } catch (error) {
        console.error(error);
    } })


