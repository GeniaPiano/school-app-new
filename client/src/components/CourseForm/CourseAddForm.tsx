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


interface Props {
    isOpen: boolean,
    onClose: ()=> void,
}

export const CourseAddForm = ({isOpen, onClose}: Props) => {

    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);


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
                <ModalHeader>Add new course </ModalHeader>
                <ModalCloseButton/>
                <ModalBody>
                  <CourseFormFields

                      isConfirmationOpen={isConfirmationOpen}
                      handleCloseConfirmModal={handleCloseConfirmModal}
                      handleGoBackToForm={handleGoBackToForm}
                  />
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}