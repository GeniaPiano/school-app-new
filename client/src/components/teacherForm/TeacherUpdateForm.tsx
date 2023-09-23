import {

    Box,

} from "@chakra-ui/react";

import {ChangeEvent, SyntheticEvent, useEffect, useState} from "react";
import {TeacherEntity, TeacherBasicData} from "../../types/teacher";
import {userFormData} from "../../utils/userFormData";
import {firstLetterToUpper} from "../../utils/firstLetterToUpper";
import {initialStateValues} from "../../utils/initialState";
import {errors} from "../../utils/errorsForm";
import {FormField} from "../FormField/FormField";
import {CourseEntity} from "../../types/course";
import {useTeachers} from "../../hooks/useTeachers";
import {useError} from "../../providers/ErrorProvider";
import {useCounter} from "../../providers/CounterPovider";
import {ErrorText} from "../common/ErrorText";
import {TeacherUpdateFooterBtns} from "./TeacherUpdateFooterBtns";
import {SelectForm} from "../FormSelect/SelectForm";
import {ChosenCourses} from "../ChosenCourses/ChosenCourses";
import {useFormState} from "../../providers/FormStateProvider";
import {ConfirmTextAndIcon} from "../common/ConfirmTextAndIcon";
import {usePostingData} from "../../providers/PostingDataProvider";


interface Props {
    teacher: TeacherEntity;
    selectedCourses: CourseEntity[];
}


export const TeacherUpdateForm = ({teacher, selectedCourses}:Props) => {


    const [inputValues, setInputValues] = useState<TeacherBasicData>(initialStateValues(teacher))
    const [coursesReadyToUpdate, setCoursesReadyToUpdate] = useState<CourseEntity[] | []>(selectedCourses)
    const [availableCourses, setAvailableCourses] = useState<CourseEntity[] | []>([])
    const {getAvailableCourses, updateTeacher} = useTeachers();
    const {dispatchError, error} = useError();
    const {incrementTeacherCounter, counterTeacher} = useCounter();
    const {changeIsEditing} = useFormState();
    const {isPostedData, changeIsPostedData} = usePostingData()


    useEffect(()=> {
        (async () => {
            const data = await getAvailableCourses();
            setAvailableCourses(data)
        })();
    }, [isPostedData, counterTeacher])

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
            if (res.success) {

                setInputValues(initialStateValues(teacher));
                changeIsEditing(false)
                changeIsPostedData(true);
                incrementTeacherCounter();

                setTimeout(()=> {
                   changeIsPostedData(false)

                }, 3500)




            }
        } catch (err) {
            dispatchError(err.response.data.message)
        } }


    return (
               <>
                   <Box>
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
                        {error && <Text color='red' size="s"> {error} </Text>}

                        <SelectForm handleChange={handleSelect} label="Courses" data={availableCourses} placeholder={"Select course/courses"}/>
                        <ChosenCourses data={coursesReadyToUpdate} handleRemove={handleRemoveCourse}/>
                     </form>
                       { isPostedData && <ConfirmTextAndIcon  text="Teacher updated" withLayer={true}/> }
                   </Box>
                     <TeacherUpdateFooterBtns   handleSubmit={handleSubmit}  />




           </>
    )
}