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
import {usePostingData} from "../../providers/PostingDataProvider";


interface Props {
    isOpen: boolean,
    onClose: ()=> void,
}


export const CourseAddForm = ({isOpen, onClose}: Props) => {

    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
    const {isPostedData } = usePostingData();
    const [inputTouched, setInputTouched] = useState<boolean>(false)
    const {text} = usePostingData();

    const changeInputTouched = (bool: boolean) => setInputTouched(bool)
    const handleCloseConfirmModal = () => {
        setIsConfirmationOpen(false);
        onClose();
    }

    const handleGoBackToForm = () => {
        setIsConfirmationOpen(false);
    }

    const handleCloseModal = () => {
        if (!inputTouched) {
            onClose();
        } else setIsConfirmationOpen(true)
    }

    return (
        <Modal isOpen={isOpen} onClose={handleCloseModal}>
            <ModalOverlay />
            <ModalContent  color="gray.500">
                <> {isPostedData
                ? <ConfirmModalContent text={text}  onClose={onClose}/>
                : <>
                        <ModalHeader>Add new course </ModalHeader>
                        <ModalCloseButton/>
                        <ModalBody>
                            <CourseFormFields
                                isConfirmationOpen={isConfirmationOpen}
                                handleCloseConfirmModal={handleCloseConfirmModal}
                                handleGoBackToForm={handleGoBackToForm}
                                onClose={onClose}
                                changeInputTouched={changeInputTouched }
                            />
                        </ModalBody>
                    </>}</>
            </ModalContent>
        </Modal>
    )
}