import {
    Box, Icon,
    FormControl,
    Text, FormLabel, Flex, Select, SimpleGrid,
} from '@chakra-ui/react'
import {CleanedStudent} from "../../types/student";
import {ChangeEvent, FormEvent, ReactNode} from "react";
import {CourseEntity} from "../../types/course";
import {InitialStudentState} from "./initialState";
import {FormFields} from "./FormFields";
import {CloseIcon} from "@chakra-ui/icons";


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
    handleSelectChange: (e: ChangeEvent<HTMLInputElement>) => void;
    availableCourses: CourseEntity[];
}

export const FormEditStudent = (props: Props): ReactNode => {

    const {handleInputChange, inputValues, handleSubmit, handleRemoveCourse, coursesReadyToUpdate, handleSelectChange, availableCourses } = props

    const newErrors  = {
        name: inputValues.name === '',
        last_name: inputValues.last_name === '',
        email: inputValues.email === '',
    };

    const chosenCourses = coursesReadyToUpdate.map(oneCourse => (
        <Box key={oneCourse.id} position="relative" bg="brand.800" color="white" p={3} borderRadius="10px" alignItems="center">
            <Text mr="15px">{oneCourse.name}</Text>
            <Icon as={CloseIcon}
                  cursor="pointer"
                  top="3" right="3"
                  w={4} h={4} p="2px"
                  position="absolute"
                  _hover={{ color: "red.400" }}
                  borderRadius="8px"
                  onClick={() => handleRemoveCourse(oneCourse.id)}
            />
        </Box>
    ));


    const coursesOption = availableCourses.map(course=> (
        <option key={course.id} value={course.id}>
            {course.name}</option>
    ))

    return (
        <Box >
            <form onSubmit={handleSubmit}>
                <FormFields handleInputChange={handleInputChange} newErrors={newErrors} inputValues={inputValues}/>
                <FormControl mb={10}>
                    <FormLabel>Courses</FormLabel>
                    <Select placeholder='Select courses'
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


