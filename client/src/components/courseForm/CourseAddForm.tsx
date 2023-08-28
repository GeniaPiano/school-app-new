import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
} from "@chakra-ui/react";


import {CourseFormFields} from "./CourseFormFields";
import {useState} from "react";
import {ConfirmModalContent} from "../common/ConfirmModalContent";


interface Props {
    isOpen: boolean,
    onClose: ()=> void,
}


export const CourseAddForm = ({isOpen, onClose}: Props) => {

    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
    const [isPostedData, setIsPostedData] = useState<boolean>(false);

    const changeIsPostedData = (bool: boolean) =>{
        setIsPostedData(bool)
    }

    const handleCloseConfirmModal = () => {
        setIsConfirmationOpen(false);
        onClose();
    }

    const handleGoBackToForm = () => {
        setIsConfirmationOpen(false);
    }


    return (
        <Modal isOpen={isOpen} onClose={()=> setIsConfirmationOpen(true)}>
            <ModalOverlay />
            <ModalContent  color="gray.500">
                <>{isPostedData
                ? <ConfirmModalContent text="Course has been added."   onClose={onClose}/>
                : <>
                        <ModalHeader>Add new course </ModalHeader>
                        <ModalCloseButton/>
                        <ModalBody>
                            <CourseFormFields
                                isConfirmationOpen={isConfirmationOpen}
                                handleCloseConfirmModal={handleCloseConfirmModal}
                                handleGoBackToForm={handleGoBackToForm}
                                onClose={onClose}
                                isPostedData={isPostedData}
                                changeIsPostedData={changeIsPostedData}

                            />
                        </ModalBody>
                    </>}</>
            </ModalContent>
        </Modal>
    )
}