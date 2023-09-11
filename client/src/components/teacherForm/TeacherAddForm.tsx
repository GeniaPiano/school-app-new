import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
} from "@chakra-ui/react";
import { useEffect, useState} from "react";
import {TeacherFormInputFields} from "./TeacherFormInputFields";
import {useTeachers} from "../../hooks/useTeachers";
import {CourseEntity} from "../../types/course";
import {initialStateUser, initialStateTouchCount} from "../../utils/initialState";
import {errorDataAddUser} from "../../utils/errorDataAddUser";
import {useError} from "../../providers/ErrorProvider";
import {usePostingData} from "../../providers/PostingDataProvider";
import {useCounter} from "../../providers/CounterPovider";
import {useFormState} from "../../providers/FormStateProvider";
import {ConfirmationBeforeClosing} from "../ConfirmationBeforeClosing/ConfirmationBeforeClosing";

import {SelectForm} from "../FormSelect/SelectForm";
import {ChosenCourses} from "../ChosenCourses/ChosenCourses";


export const TeacherAddForm = ({onClose, isOpen})=> {

    const {dispatchError} = useError();
    const {changeIsPostedData} = usePostingData();
    const {incrementTeacherCounter, counterTeacher} = useCounter();
    const [inputValues, setInputValues] = useState(initialStateUser)
    const [inputTouchedCount, setInputTouchedCount] = useState(initialStateTouchCount);

    const [availableCourses, setAvailableCourses] = useState<CourseEntity[] | []>([])
    const [selectedCourses, setSelectedCourses] = useState<CourseEntity[] | []>([])
    const {getAvailableCourses, addNewTeacher } = useTeachers();



    useEffect(()=> {
        (async () => {
            const courses = await getAvailableCourses();
            setAvailableCourses(courses)
        } )()
    },[counterTeacher])


    const isError = errorDataAddUser(inputTouchedCount, inputValues);

    const handleChangeInputValue = (e) => {
        const {name, value} = e.target
        setInputTouchedCount(prev => ({
            ...prev,
            [name]: prev[name] + 1,
        }));
        setInputValues( prev => ({
            ...prev,
            [name] : value
        }))
    };

    const handleSelectCourse = (e) => {
        const courseId: string = e.target.value;
        if (availableCourses.length !== 0) {
            const courseToAdd: CourseEntity = availableCourses.find(course => course.id === courseId)
            setSelectedCourses(prevState => [...prevState, courseToAdd])
            setAvailableCourses(prev => prev.filter(course => course.id !== courseId))
        }
    }

    const handleRemoveCourse = (courseId) => {
        const course = selectedCourses.find(one => one.id === courseId)
        setSelectedCourses(prevSelectedCourses => prevSelectedCourses.filter(course => course.id !== courseId));
        setAvailableCourses(prev => ([...prev, course]))
    };

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
            const res = await addNewTeacher(inputValues, selectedCourses)
            if (res.success) {
                changeIsPostedData(true);
                setTimeout(()=> {
                    onClose();
                    changeIsPostedData(false)
                    incrementTeacherCounter();
                }, 3000)
            }

        } catch (err) {
            dispatchError(err.response.data.message)
        }
    }

    const {handleModalCloseBtn, openConfirmation, closeConfirmation} = useFormState()


    const handleConfirmModalClose = (shouldClose) => {
        closeConfirmation();
        if (shouldClose) {
            onClose();
            setInputValues({name: '', last_name: '', email: ''})
            setInputTouchedCount(initialStateTouchCount)
        } else {
            closeConfirmation()
        }
    }

    const handleCloseMainModal = () => {
        openConfirmation();
        if (inputTouchedCount.name > 0  ) {
            openConfirmation()
        }  else {
            closeConfirmation()
            setInputValues(initialStateUser);
            setSelectedCourses([])
            incrementTeacherCounter();
            onClose();
        }
    };

    return (
        <>
            <Modal isOpen={isOpen} onClose={handleModalCloseBtn}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add new teacher</ModalHeader>
                    <ModalCloseButton onClick={handleCloseMainModal}/>
                    <ModalBody>
                        <form >
                            <TeacherFormInputFields
                                inputValues={inputValues}
                                isError={isError}
                                handleChangeInputValue={handleChangeInputValue}
                            />
                            <SelectForm data={availableCourses} handleChange={handleSelectCourse} placeholder="Select course/courses." label="Courses"/>
                        </form>
                        <ChosenCourses data={selectedCourses} handleRemove={handleRemoveCourse}/>
                        <Button  mb={35} onClick={handleSubmit}>save</Button>

                    </ModalBody>
                </ModalContent>
            </Modal>

            <ConfirmationBeforeClosing forAdding={true}  handleConfirmModalCloseForAdding={handleConfirmModalClose}/>
        </>
    )
}