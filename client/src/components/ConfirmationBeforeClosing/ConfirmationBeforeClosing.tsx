import {Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay} from "@chakra-ui/react";
import {useFormState} from "../../provider/FormStateProvider";


export const  ConfirmationBeforeClosing = () => {
    //const {isConfirmationOpen, handleCloseConfirmModal, handleCloseAfterConfirm, handleGoBackToEdit} = props

    const {isConfirmationOpen, handleCloseConfirmModal, handleGoBackToEdit, handleCloseAfterConfirm} = useFormState();

    return (
            <Modal  isOpen={isConfirmationOpen} onClose={handleCloseAfterConfirm} >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Confirmation</ModalHeader>
                    <ModalBody>
                        Are you sure you want to close without saving changes?
                    </ModalBody>
                    <ModalFooter >
                        <Button mr={2} colorScheme="gray"  color="gray.600" onClick={handleCloseConfirmModal}>
                            Yes, Close
                        </Button>
                        <Button colorScheme="gray"  color="gray.600" onClick={handleGoBackToEdit}>
                            Go back to edit
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
    )
}