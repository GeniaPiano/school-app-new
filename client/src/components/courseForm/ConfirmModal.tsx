import {Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay} from "@chakra-ui/react";

interface Props {
    isConfirmationOpen: boolean;
    handleCloseConfirmModal: () => void;
    handleGoBackToForm: () => void;
}

export const  ConfirmModal = ({isConfirmationOpen, handleCloseConfirmModal, handleGoBackToForm}:Props) => {

    return (
        <Modal  isOpen={isConfirmationOpen}  >
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
                    <Button colorScheme="gray"  color="gray.600" onClick={handleGoBackToForm}>
                        Go back to Form.
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}