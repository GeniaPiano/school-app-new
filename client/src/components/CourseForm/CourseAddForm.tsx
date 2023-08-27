import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay, Select
} from "@chakra-ui/react";


import {CourseFormFields} from "./CourseFormFields";


interface Props {
    isOpen: boolean,
    onClose: ()=> void,
}

export const CourseAddForm = ({isOpen, onClose}: Props) => {




    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent  color="gray.500">
                <ModalHeader>Add new course </ModalHeader>
                <ModalCloseButton/>
                <ModalBody>
                  <CourseFormFields/>
                </ModalBody>

            </ModalContent>
        </Modal>
    )
}