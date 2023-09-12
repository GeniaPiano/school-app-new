import {
    Button, Text,
} from "@chakra-ui/react";
import {firstLetterToUpper} from "../../utils/firstLetterToUpper";
import {useEffect, useState} from "react";
import {TeacherEntity} from "../../types/teacher";
import {useTeachers} from "../../hooks/useTeachers";
import {useCourses} from "../../hooks/useCourses";
import {useCounter} from "../../providers/CounterPovider";
import {ConfirmModal} from "./ConfirmModal";

import {usePostingData} from "../../providers/PostingDataProvider";
import {FormField} from "../FormField/FormField";
import {useError} from "../../providers/ErrorProvider";
import {ErrorText} from "../common/ErrorText";
import {SelectForm} from "../FormSelect/SelectForm";


interface Props {
    isConfirmationOpen: boolean;
    handleCloseConfirmModal: ()=> void;
    handleGoBackToForm: ()=> void;
    onClose: ()=> void;
    changeInputTouched: (boolean)=> void;
}

export const CourseFormFields = ({isConfirmationOpen, handleCloseConfirmModal, handleGoBackToForm, onClose, changeInputTouched }: Props) => {

    const [teachers, setTeachers] = useState<TeacherEntity[] | []>([]);
    const {getAllTeachers} = useTeachers();
    const [courseName, setCourseName] = useState<string>('')
    const [selectTeacherId, setSelectTeacherId] = useState<string>('')
    const {addCourse} = useCourses();
    const {incrementCourseCounter, incrementTeacherCounter} = useCounter();
    const {changeIsPostedData, dispatchText} = usePostingData()



    useEffect(() => {
        (async() => {
            const teachersData = await getAllTeachers();
            setTeachers(teachersData);
        })()
    }, [])


    const [inputTouchedCount, setInputTouchedCount] = useState<number>(0);
    const {dispatchError, error} = useError();

    const handleChangeInputValue = (e) => {
        const value = firstLetterToUpper(e.target.value);
        setCourseName(value);
        setInputTouchedCount(prev => prev + 1);
        changeInputTouched(true);
    };


    const handleSubmit = async(e) => {
        e.preventDefault();
        if (courseName.length < 4 || courseName.length > 40 || courseName.length === 0) {
            dispatchError('Cannot add empty Course name.')
            return
        }
        e.preventDefault();
        try {
            const res = await addCourse(courseName, selectTeacherId);
            incrementCourseCounter();
            incrementTeacherCounter();
            setCourseName('');
            setSelectTeacherId('');
            setInputTouchedCount(0)
            if (res.success) {
                changeIsPostedData(true);
                dispatchText('Course has benn added.')
                setTimeout(()=> {
                    onClose();
                    changeIsPostedData(false)
                }, 3000)
                }

        }catch (e) {
            console.log(e)
        }
    }

   const isError = (inputTouchedCount > 3 && (courseName === '' || courseName.length < 4 || courseName.length > 40));

   const handleSelect = (e)=> setSelectTeacherId(e.target.value)

    return (
        <form  >
            <FormField name='name'
                       value={courseName}
                       onChange={handleChangeInputValue}
                       label="Name"
                       type="text"
                       error={isError}
                       errorMessage=" Course name is required. It should contain from 4 to 40 chars."
            />
            {error &&  <ErrorText text={error}/>}
            <SelectForm comment="* You can add teacher later." label="Teacher" data={teachers} handleChange={handleSelect} placeholder="Select teacher." />

            <Button mb={8} colorScheme="gray" onClick={handleSubmit}>Save</Button>
            <ConfirmModal
                isConfirmationOpen={isConfirmationOpen}
                handleCloseConfirmModal={handleCloseConfirmModal}
                handleGoBackToForm={handleGoBackToForm}
            />

        </form>
    )
}