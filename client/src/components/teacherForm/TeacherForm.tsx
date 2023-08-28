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

export const TeacherForm = () => {

    const [inputValues, setInputValues] = useState({
        name: '',
        last_name: "",
        email: "",
    })
    const [inputTouchedCount, setInputTouchedCount] = useState({
        name: 0,
        last_name: 0,
        email: 0,
    });

    const [availableCourses, setAvailableCourses] = useState<CourseEntity[] | []>(null)
    const [coursesReadyToUpdate, setCoursesReadyToUpdate] = useState<CourseEntity[] | null>([])


    const {getAvailableCourses} = useTeachers();


    useEffect(()=> {
        (async () => {
            const courses = await getAvailableCourses();
            setAvailableCourses(courses)
        } )()
    },[])


    const {name, last_name, email} = inputValues
    const isError = {
       name: (inputTouchedCount.name > 2 && (name === '' || name.length < 2 || name.length > 40)),
       last_name: (inputTouchedCount.last_name > 3 && (last_name === '' || last_name.length < 2 || last_name.length > 40)),
       email: (inputTouchedCount.email > 3 && (email === '' || email.length < 4 || email.length > 40 || !email.includes('@')) ),
   };

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
        const courseId = e.target.value;
        if (availableCourses) {
            const courseToAdd = availableCourses.find(course => course.id === courseId)
            setCoursesReadyToUpdate(prevState => [...prevState, courseToAdd])
            setAvailableCourses(prev => prev.filter(course => course.id !== courseId))
        }

        console.log("avail", availableCourses)
        console.log("redy", coursesReadyToUpdate)
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

    return (
        <>
            <ModalOverlay />
            <ModalContent  color="gray.500">
                <ModalHeader>Add new teacher</ModalHeader>
                <ModalCloseButton/>
                <ModalBody>
                    <form>
                        <TeacherFormInputFields
                            inputValues={inputValues}
                            isError={isError}
                            handleChangeInputValue={handleChangeInputValue}/>
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
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Btn text="save" type="button"/>
                </ModalFooter>
            </ModalContent>

        </>
    )
}