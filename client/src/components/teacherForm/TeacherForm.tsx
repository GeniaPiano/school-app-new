import {
    Box,
    FormControl,
    FormLabel,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay, Select, SimpleGrid
} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {TeacherFormInputFields} from "./TeacherFormInputFields";
import {useTeachers} from "../../hooks/useTeachers";
import {CourseEntity} from "../../types/course";
import {Btn} from "../common/Btn";
import {CourseItem} from "../common/ CourseItem";
import {initialStateTeacher, initialStateTouchCount} from "./teacherFormData";
import {errorData} from "./errorData";

export const TeacherForm = () => {

    const [inputValues, setInputValues] = useState(initialStateTeacher)
    const [inputTouchedCount, setInputTouchedCount] = useState(initialStateTouchCount);

    const [availableCourses, setAvailableCourses] = useState<CourseEntity[] | []>(null)
    const [coursesReadyToUpdate, setCoursesReadyToUpdate] = useState<CourseEntity[] | null>([])
    const [errorMessage, setErrorMessage] = useState<string>('')

    const {getAvailableCourses, addNewTeacher } = useTeachers();


    useEffect(()=> {
        (async () => {
            const courses = await getAvailableCourses();
            setAvailableCourses(courses)
        } )()
    },[])


    const isError = errorData(inputTouchedCount, inputValues);

      const handleChangeInputValue = (e) => {
         setInputTouchedCount(prev => ({
             ...prev,
             [e.target.name]: prev[e.target.name] + 1,
         }));

         setInputValues( prev => ({
             ...prev,
             [e.target.name] : e.target.value
         }))
    };

    const handleSelectCourse = (e) => {
        const courseId: string = e.target.value;
        if (availableCourses) {
            const courseToAdd = availableCourses.find(course => course.id === courseId)
            setCoursesReadyToUpdate(prevState => [...prevState, courseToAdd])
            setAvailableCourses(prev => prev.filter(course => course.id !== courseId))
        }
    }

    const options = availableCourses?.map(course => (
        <option key={course.id} value={course.id} > {course.name} </option>
    ))
    const handleRemoveCourse = (courseId) => {
        setCoursesReadyToUpdate(prevSelectedCourses => prevSelectedCourses.filter(course => course.id !== courseId));
    };

    const selectedCourses = coursesReadyToUpdate?.map(oneCourse => (
        <Box key={oneCourse.id} position="relative" bg="brand.800" color="white" p={3} borderRadius="10px" alignItems="center">
            <CourseItem name={oneCourse.name} courseId={oneCourse.id} handleRemove={handleRemoveCourse} />
        </Box>
    ))


    const setTouchedCount = (field, count) => {
        setInputTouchedCount(prev => ({
            ...prev,
            [field]: count
        }));
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        if (inputValues.name === '') {
            setTouchedCount('name', 3);
        }

        if (inputValues.last_name === '') {
            setTouchedCount('last_name', 3);
        }

        if (inputValues.email === '') {
            setTouchedCount('email', 4);
        }

        try {
            const res = await addNewTeacher(inputValues, coursesReadyToUpdate)
            console.log('res', res)
        } catch (err) {
            setErrorMessage(err.response.data.message)
        }

    }

    return (
        <>
            <ModalOverlay />
            <ModalContent  color="gray.500">
                <ModalHeader>Add new teacher</ModalHeader>
                <ModalCloseButton/>
                <ModalBody>
                    <form onSubmit={handleSubmit}>
                        <TeacherFormInputFields
                            inputValues={inputValues}
                            isError={isError}
                            handleChangeInputValue={handleChangeInputValue}
                            errorMessage={errorMessage}
                        />
                        <FormControl mb={8}>
                            <FormLabel>Courses</FormLabel>
                            <Select onChange={handleSelectCourse}
                                    placeholder='Select course'
                                    variant='filled'
                                    outline='none'
                                    focusBorderColor="brand.600"
                            >
                                <>{availableCourses && options}</>
                            </Select>
                        </FormControl>

                        <SimpleGrid columns={3} spacing={4} my={5}>
                            <> {selectedCourses} </>
                        </SimpleGrid>
                        <Btn text="save" type="submit"/>
                    </form>
                </ModalBody>
                <ModalFooter>

                </ModalFooter>
            </ModalContent>

        </>
    )
}