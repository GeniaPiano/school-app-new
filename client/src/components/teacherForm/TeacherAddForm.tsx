import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
} from "@chakra-ui/react";
import { useEffect} from "react";
import {TeacherFormFields} from "./TeacherFormFields";
import {useTeachers} from "../../hooks/useTeachers";
import {errorDataAddUser} from "../../utils/errorDataAddUser";
import {useError} from "../../providers/ErrorProvider";
import {usePostingData} from "../../providers/PostingDataProvider";
import {useCounter} from "../../providers/CounterPovider";
import {useFormState} from "../../providers/FormStateProvider";
import {ConfirmationBeforeClosing} from "../ConfirmationBeforeClosing/ConfirmationBeforeClosing";

import {SelectForm} from "../FormSelect/SelectForm";
import {ChosenCourses} from "../ChosenCourses/ChosenCourses";
import {ErrorText} from "../common/ErrorText";
import {useAddUser} from "../../providers/AddUserProvider";


export const TeacherAddForm = ({onClose, isOpen})=> {

    const {dispatchError,error} = useError();
    const {changeIsPostedData,  dispatchText} = usePostingData();
    const {incrementTeacherCounter, counterTeacher} = useCounter();
    const {handleModalCloseBtn, openConfirmation, closeConfirmation} = useFormState()
    const {getAvailableCourses, addNewTeacher } = useTeachers();

    const {setAvailableCourses, inputTouchedCount, inputValues,
        resetInputAndTouch, checkInputTouchCount, selectedCourses,
        handleSelectCourse, handleRemoveCourse, handleChangeInputValue, availableCourses} = useAddUser();



    useEffect(()=> {
        (async () => {
            const courses = await getAvailableCourses();
            setAvailableCourses(courses)
        } )()
    },[counterTeacher])


    const isError = errorDataAddUser(inputTouchedCount, inputValues);


    const handleSubmit = async(e) => {
        e.preventDefault();
        checkInputTouchCount()

        try {
            const res = await addNewTeacher(inputValues, selectedCourses)
            if (res.success) {
                changeIsPostedData(true);
                dispatchText('Teacher has been added.')
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



    const handleConfirmModalClose = (shouldClose) => {
        closeConfirmation();
        if (shouldClose) {
            onClose();
            resetInputAndTouch()
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
            resetInputAndTouch()
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
                            <TeacherFormFields
                                inputValues={inputValues}
                                isError={isError}
                                handleChangeInputValue={handleChangeInputValue}
                            />
                            <SelectForm comment="You can add courses later." data={availableCourses} handleChange={handleSelectCourse} placeholder="Select course/courses." label="Courses"/>
                        </form>
                        <ChosenCourses data={selectedCourses} handleRemove={handleRemoveCourse}/>
                        {error && <ErrorText text={error}/>}
                        <Button  mb={35} onClick={handleSubmit}>save</Button>

                    </ModalBody>
                </ModalContent>
            </Modal>

            <ConfirmationBeforeClosing forAdding={true}  handleConfirmModalCloseForAdding={handleConfirmModalClose}/>
        </>
    )
}