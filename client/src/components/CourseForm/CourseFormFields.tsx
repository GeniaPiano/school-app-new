import {Button, FormControl, FormErrorMessage, FormLabel, Input, Select} from "@chakra-ui/react";
import {firstLetterToUpper} from "../../utils/firstLetterToUpper";
import {useEffect, useState} from "react";
import {TeacherEntity} from "../../types/teacher";
import {useTeachers} from "../../hooks/useTeachers";
import {useCourses} from "../../hooks/useCourses";
import {useCounter} from "../../provider/CounterPovider";

export const CourseFormFields = () => {

    const [teachers, setTeachers] = useState<TeacherEntity[] | null>(null);
    const {getAllTeachers} = useTeachers();
    const [courseName, setCourseName] = useState<string>('')
    const [selectTeacherId, setSelectTeacherId] = useState<string>('')
    const {addCourse} = useCourses();
    const {incrementCounter} = useCounter();


    useEffect(() => {
        (async() => {
            const teachersData = await getAllTeachers();
            setTeachers(teachersData);
        })()
    }, [])



    const [inputTouchedCount, setInputTouchedCount] = useState<number>(0);

    const handleChangeInputValue = (e) => {
        const value = firstLetterToUpper(e.target.value);
        setCourseName(value);
        setInputTouchedCount(inputTouchedCount + 1);
    };



    const handleSubmit = async(e) => {
        e.preventDefault();

        if (courseName.length < 4 || courseName.length > 40 || courseName.length === 0) {
            console.log('input data not correct')
            return
        }
        e.preventDefault();
        try {
            const res = await addCourse(courseName, selectTeacherId);
            incrementCounter();

            console.log('submit  course', res.data)
        }catch (e) {
            console.log(e)
        }

    }

    const options = teachers ? teachers.map(oneTeacher => (
        <option key={oneTeacher.id} value={oneTeacher.id}> {firstLetterToUpper(oneTeacher.name)} {firstLetterToUpper(oneTeacher.last_name)} </option>
    )) : null;


    const isError = (inputTouchedCount > 3 && (courseName === '' || courseName.length < 4 || courseName.length > 40));



    return (
        <form onSubmit={handleSubmit} >
            <FormControl mb={5} isInvalid={isError}>
                <FormLabel>Name</FormLabel>
                <Input
                    value={courseName}
                    onChange={handleChangeInputValue}
                    focusBorderColor="brand.600"/>
                <>{isError &&  <FormErrorMessage> Course name is required. It should contain from 4 to 40 chars.</FormErrorMessage>} </>
            </FormControl>


            <FormControl mb={8}>
                <FormLabel>Teacher</FormLabel>
                <Select onChange={(e)=> setSelectTeacherId(e.target.value)}
                        placeholder='Select teacher'
                        variant='filled'
                        outline='none'
                        focusBorderColor="brand.600"
                >
                    <>{options}</>
                </Select>
            </FormControl>
            <Button type="submit" mb={35}>Save</Button>
        </form>
    )
}