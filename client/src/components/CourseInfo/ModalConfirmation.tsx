import {Badge, Button, ModalBody, ModalFooter, ModalHeader} from "@chakra-ui/react";

interface Props {
    name: string;
    handleDeleteCourse: () => void;
    changeIsDelete: (bool: boolean) => void;
    closeModal: () => void;
}

export const ModalConfirmation = ({name, handleDeleteCourse, changeIsDelete, closeModal}: Props) => {
    return (
        <>
            <ModalHeader color="gray.600">Delete course</ModalHeader>
            <ModalBody>Are you sure you want to delete
                <Badge colorScheme='teal'> {name} </Badge> ? <br/>
                You cannot undo this action.
            </ModalBody>
            <ModalFooter>
                <Button colorScheme='pink' onClick={handleDeleteCourse} mr={3}>Yes, delete</Button>
                <Button onClick={()=> {
                    changeIsDelete(false)
                    closeModal();
                }}>No</Button>
            </ModalFooter>
        </>
    )
}