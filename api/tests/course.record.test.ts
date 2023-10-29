import {pool} from "../utils/db";
import {CourseRecord} from "../records/course.record";

afterAll(async () => {
    await pool.end();
});


test('CourseRecord returns correct data from new created Course', async () => {
    try {
        const course = new CourseRecord({
            name: "Tango dance",
            photoUrl: 'https://www.datocms-assets.com/107048/1697483793-dance-studio.png',
            price: 40,
            description: 'Discover wonderful argentinian tango with our passionate instructor from Latin America.  '

        })
        await course.insert();
        expect(course.id).toBeDefined();
        expect(course.name).toBe('Tango dance');
    } catch (err) {
        console.log(err)
    }
})

