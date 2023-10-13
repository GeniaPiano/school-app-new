import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,


} from "@chakra-ui/react";
import {useFormState} from "../../providers/FormStateProvider";

interface Props {

    handleConfirmModalCloseForAdding?: (confirmed: boolean) => void;
    handleCloseConfirmStudentModal?: () => void}

export const ConfirmationBeforeClosing = ({handleConfirmModalCloseForAdding, handleCloseConfirmStudentModal  }: Props) => {
    const {isConfirmationOpen, handleCloseConfirmModal, handleGoBackToEdit, handleModalCloseBtn, forAdding} = useFormState();

    return (
        <Modal isOpen={isConfirmationOpen} onClose={handleModalCloseBtn}>
            <ModalContent>
                <ModalHeader>Confirmation</ModalHeader>
                <ModalBody>
                    Are you sure you want to close without saving changes?
                </ModalBody>
                <ModalFooter>
                    <>  {forAdding? (
                        <>
                            <Button
                                mr={2}
                                colorScheme="gray"
                                color="gray.600"
                                onClick={() => handleConfirmModalCloseForAdding(true)}
                            >
                                Yes, Close
                            </Button>
                            <Button
                                colorScheme="gray"
                                color="gray.600"
                                onClick={() => handleConfirmModalCloseForAdding(false)}
                            >
                                Go back to edit
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button
                                mr={2}
                                colorScheme="gray"
                                color="gray.600"
                                onClick={handleCloseConfirmStudentModal ? handleCloseConfirmStudentModal : handleCloseConfirmModal}
                            >
                                Yes, Close
                            </Button>
                            <Button
                                colorScheme="gray"
                                color="gray.600"
                                onClick={handleGoBackToEdit}
                            >
                                Go back to edit
                            </Button>
                        </>
                    )} </>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};