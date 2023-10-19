import {
    Button,
  } from "@chakra-ui/react";
import {firstLetterToUpper} from "../../utils/firstLetterToUpper";
import {ChangeEvent, useEffect, useState} from "react";
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
import {imagesUrls} from "./imagesUrls";
import {SelectPrice} from "./SelectPrice";
import {SelectPhotoUrl} from "./SelectPhotoUrl";
import {CourseDescription} from "./CourseDescription";


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
    const [description, setDescription] = useState<string>('')
    const [photoUrl, setPhotoUrl] = useState<string>(imagesUrls[0])
    const [price, setPrice] = useState<string>('40')
    const [selectTeacherId, setSelectTeacherId] = useState<string>('')
    const {addCourse} = useCourses();
    const {incrementCourseCounter, incrementTeacherCounter} = useCounter();
    const {changeIsPostedData, dispatchText} = usePostingData()
    const [inputTouchedCount, setInputTouchedCount] = useState<number>(0);
    const {dispatchError, error} = useError();
    const isError = (inputTouchedCount > 3 && (courseName === '' || courseName.length < 4 || courseName.length > 40));

    useEffect(() => {
        (async() => {
            const teachersData = await getAllTeachers('');
            setTeachers(teachersData);
        })()
    }, [getAllTeachers])

    const handleSelectTeacher = (e) => setSelectTeacherId(e.target.value)
    const handleSelectPrice = (price: string) => setPrice(price)
    const handleSelectPhotoUrl = (url: string) => setPhotoUrl(url);
    const handleChangeInputValue = (e) => {
        const value = firstLetterToUpper(e.target.value);
        setCourseName(value);
        setInputTouchedCount(prev => prev + 1);
        changeInputTouched(true);
    };

    const handleDescription = (e:ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value)
    }


    const handleSubmit = async(e) => {
        e.preventDefault();
        if (courseName.length < 4 || courseName.length > 40 || courseName.length === 0) {
            dispatchError('Course name is required and it should contain from 4 to 40 chars.')
            return
        }
        e.preventDefault();
        try {
            const res = await addCourse(courseName, selectTeacherId,  price, description, photoUrl);
            incrementCourseCounter();
            incrementTeacherCounter();
            setCourseName('');
            setSelectTeacherId('');
            setInputTouchedCount(0)
            if (res.success) {
                changeIsPostedData(true);
                dispatchText('Course has been added.')
                setTimeout(()=> {
                    onClose();
                    changeIsPostedData(false)
                    handleGoBackToForm()
                }, 3000)
                }

        }catch (e) {
            console.log(e)
        }
    }


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
            <CourseDescription handleDescription={handleDescription} description={description}/>
            <SelectForm comment="* You can add teacher later." label="Teacher" isTeacher={true} data={teachers} handleChange={handleSelectTeacher} placeholder="Select teacher." />
            <SelectPrice price={price}  handleSelectPrice={handleSelectPrice}/>
            <SelectPhotoUrl photoUrl={photoUrl} handleSelectPhotoUrl={handleSelectPhotoUrl} />
            {error &&  <ErrorText text={error}/>}

            <Button mb={8} ml={250}
                    colorScheme="gray"
                    onClick={handleSubmit}
                    >Save</Button>

            <ConfirmModal
                isConfirmationOpen={isConfirmationOpen}
                handleCloseConfirmModal={handleCloseConfirmModal}
                handleGoBackToForm={handleGoBackToForm}
            />

        </form>
    )
}