import {
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Select, useToast
} from "@chakra-ui/react";
import {firstLetterToUpper} from "../../utils/firstLetterToUpper";
import {useEffect, useState} from "react";
import {TeacherEntity} from "../../types/teacher";
import {useTeachers} from "../../hooks/useTeachers";
import {useCourses} from "../../hooks/useCourses";
import {useCounter} from "../../provider/CounterPovider";
import {ConfirmModal} from "./ConfirmModal";
import {Btn} from "../common/Btn";
import {usePostingData} from "../../provider/PostingDataProvider";


interface Props {
    isConfirmationOpen: boolean;
    handleCloseConfirmModal: ()=> void;
    handleGoBackToForm: ()=> void;
    onClose: ()=> void;
}

export const CourseFormFields = ({isConfirmationOpen, handleCloseConfirmModal, handleGoBackToForm, onClose}: Props) => {

    const [teachers, setTeachers] = useState<TeacherEntity[] | null>(null);
    const {getAllTeachers} = useTeachers();
    const [courseName, setCourseName] = useState<string>('')
    const [selectTeacherId, setSelectTeacherId] = useState<string>('')
    const {addCourse} = useCourses();
    const {incrementCourseCounter} = useCounter();
    const {changeIsPostedData} = usePostingData()



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
        setInputTouchedCount(prev => prev + 1);
    };


    const handleSubmit = async(e) => {
        e.preventDefault();
        if (courseName.length < 4 || courseName.length > 40 || courseName.length === 0) {
            return
        }
        e.preventDefault();
        try {
            const res = await addCourse(courseName, selectTeacherId);
            incrementCourseCounter();
            setCourseName('');
            setSelectTeacherId('');
            setInputTouchedCount(0)
            if (res.success) {
                changeIsPostedData(true);
                setTimeout(()=> {
                    onClose();
                    changeIsPostedData(false)
                }, 3000)
                }

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
            <Btn type="submit" text="Save"/>
            <ConfirmModal
                isConfirmationOpen={isConfirmationOpen}
                handleCloseConfirmModal={handleCloseConfirmModal}
                handleGoBackToForm={handleGoBackToForm}
            />

        </form>
    )
}