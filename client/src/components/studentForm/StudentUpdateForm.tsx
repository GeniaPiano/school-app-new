import {
    Box, Icon,
    FormControl,
    Text, FormLabel, Select, SimpleGrid,
} from '@chakra-ui/react'
import {CleanedStudent} from "../../types/student";
import {ChangeEvent, FormEvent, ReactNode} from "react";
import {CourseEntity} from "../../types/course";
import {InitialStudentState} from "./initialState";
import {StudentFormFields} from "./StudentFormFields";
import {CourseItem} from "../common/CourseItem";
import {errors} from "../../utils/errorsForm";


interface Props {
    studentData: {
        student: CleanedStudent,
        selectedCourses: CourseEntity[],
    },
    handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    inputValues: InitialStudentState;
    handleSubmit: (e: FormEvent) => void;
    handleRemoveCourse: (courseId: string) => void,
    coursesReadyToUpdate: CourseEntity[],
    handleSelectChange: (e) => void;
    availableCourses: CourseEntity[];
}

export const StudentUpdateForm = (props: Props): ReactNode => {

    const {handleInputChange, inputValues, handleSubmit, handleRemoveCourse, coursesReadyToUpdate, handleSelectChange, availableCourses } = props
    const newErrors = errors(inputValues);


    const chosenCourses = coursesReadyToUpdate.map(oneCourse => (
        <Box key={oneCourse.id} position="relative" bg="brand.800" color="white" p={3} borderRadius="10px" alignItems="center">
            <CourseItem name={oneCourse.name} courseId={oneCourse.id} handleRemove={handleRemoveCourse} />
        </Box>
    ));


    const coursesOption = availableCourses.map(course=> (
        <option key={course.id} value={course.id}>
            {course.name}</option>
    ))

    return (
        <Box >
            <form onSubmit={handleSubmit}>
                <StudentFormFields handleInputChange={handleInputChange}  newErrors={newErrors} inputValues={inputValues}/>
                <FormControl mb={10}>
                    <FormLabel>Courses</FormLabel>
                    <Select placeholder='Select courses'
                            variant='filled'
                            outline='none'
                            focusBorderColor="brand.600"
                            onChange={handleSelectChange}>
                        <>{coursesOption}</>
                    </Select>
                </FormControl>

                <SimpleGrid columns={3} spacing={4} my={5}>
                    <> {chosenCourses} </>
                </SimpleGrid>

            </form>

        </Box>
    )
}


