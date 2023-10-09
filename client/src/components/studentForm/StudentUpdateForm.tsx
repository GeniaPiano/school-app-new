import {Box} from '@chakra-ui/react'
import {CleanedStudent} from "../../types/student";
import {ChangeEvent, FormEvent, ReactNode} from "react";
import {CourseEntity} from "../../types/course";
import {InitialStudentState} from "./initialState";
import {StudentFormFields} from "./StudentFormFields";
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

    const { handleInputChange, inputValues, handleSubmit } = props
    const newErrors = errors(inputValues);

    return (
        <Box >
            <form onSubmit={handleSubmit}>
                <StudentFormFields handleInputChange={handleInputChange}  newErrors={newErrors} inputValues={inputValues}/>
            </form>
        </Box>
    )
}


