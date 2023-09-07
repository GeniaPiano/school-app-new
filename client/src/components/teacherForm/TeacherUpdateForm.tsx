import {Box, Button, ModalFooter, SimpleGrid} from "@chakra-ui/react";

import {ChangeEvent, SyntheticEvent, useEffect, useState} from "react";
import {TeacherEntity, TeacherBasicData} from "../../types/teacher";
import {userFormData} from "../../utils/userFormData";
import {firstLetterToUpper} from "../../utils/firstLetterToUpper";
import {initialStateValues} from "./initialState";
import {errors} from "../../utils/errorsForm";
import {FormField} from "../FormField/FormField";
import {FormSelect} from "../FormSelect/FormSelect";
import {CourseEntity} from "../../types/course";
import {CourseItem} from "../common/CourseItem";
import {useTeachers} from "../../hooks/useTeachers";
import {useError} from "../../provider/ErrorProvider";
import {useCounter} from "../../provider/CounterPovider";
import {ErrorText} from "../common/ErrorText";


interface Props {
    teacher: TeacherEntity;
    selectedCourses: CourseEntity[];
    isEditing: boolean;
    cancelEditing: ()=>void;
}

export const TeacherUpdateForm = ({teacher, selectedCourses, cancelEditing }:Props) => {


    const [inputValues, setInputValues] = useState<TeacherBasicData>(initialStateValues(teacher))
    const [coursesReadyToUpdate, setCoursesReadyToUpdate] = useState<CourseEntity[] | []>(selectedCourses)
    const [availableCourses, setAvailableCourses] = useState<CourseEntity[] | []>([])
    const {getAvailableCourses, updateTeacher} = useTeachers();
    const {dispatchError, error} = useError();
    const {incrementTeacherCounter} = useCounter();

    useEffect(()=> {
        (async () => {
            const data = await getAvailableCourses();
            setAvailableCourses(data)
        })();
    }, [teacher])

    const handleInputChange = (  e: ChangeEvent<HTMLInputElement>) => {
        setInputValues((prev) => {
            const {name, value} = e.target
            return {
                ...prev,
                [name]: name === 'email' ? value.toLowerCase() : firstLetterToUpper(value)
              }
        })
    };

    const newErrors = errors(inputValues)

    const handleSelect = (e:ChangeEvent<HTMLSelectElement>) => {
        const courseId: string = e.target.value;
        const course = availableCourses.find(oneCourse => oneCourse.id === courseId)
        setCoursesReadyToUpdate(prev => ([...prev, course]))

    }

    const handleRemoveCourse =(courseId: string)=> {
        const course = coursesReadyToUpdate.find(oneCourse => oneCourse.id === courseId)
        setCoursesReadyToUpdate(prevSelectedCourses => prevSelectedCourses.filter(course => course.id !== courseId));
        setAvailableCourses(prev => ([...prev, course]))
    }

    const handleSubmit = async(e: SyntheticEvent) => {
        e.preventDefault();
        try {
            const res = await updateTeacher(teacher.id, inputValues, coursesReadyToUpdate)
            console.log(res)
            if (res.success) {
                incrementTeacherCounter();
            }

        } catch (err) {
            dispatchError(err.response.data.message)
        }


    }

    const chosenCourses = coursesReadyToUpdate.map(oneCourse => (
        <Box key={oneCourse.id} position="relative" bg="brand.800" color="white" p={3} borderRadius="10px" alignItems="center">
            <CourseItem name={oneCourse.name} courseId={oneCourse.id} handleRemove={handleRemoveCourse} />
        </Box>
    ));

    const options = availableCourses === []
        ? null
        : availableCourses.map(oneCourse => (
        <option key={oneCourse.id} value={oneCourse.id}> {oneCourse.name} </option>
    ))




    return (
       <> <Box>
            <form>
                {userFormData.map((oneForm) => (
                    <FormField key={oneForm.title}
                               name={oneForm.name}
                               value={inputValues[oneForm.name]}
                               type={oneForm.type}
                               label={oneForm.title}
                               errorMessage={oneForm.errorMessage}
                               error={newErrors[oneForm.name]}
                               onChange={handleInputChange}

                    />
                ))}

                {error && <ErrorText text={error}/>}

                <FormSelect children={options} placeholder={availableCourses === [] ? "Bo courses to assign. " : "Select courses"} handleSelect={handleSelect} />
                <SimpleGrid columns={3} spacing={4} my={5}>
                    <> {chosenCourses} </>
                </SimpleGrid>
            </form>
        </Box>

           <ModalFooter>
               <Button
                       color="gray.500"
                       colorScheme='gray'
                       mr={3}
                       onClick={handleSubmit}>
                   Save
               </Button>
                   <Button  color="gray.500"
                            colorScheme='gray'
                            onClick={cancelEditing}
                   >Cancel</Button>
           </ModalFooter>

       </>
    )
}