import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay
} from "@chakra-ui/react";
import {userFormData} from "../../utils/userFormData";
import {FormField} from "../FormField/FormField";
import {useState} from "react";
import {initialStateTouchCount} from "../../utils/initialState";
import {errorDataAddUser} from "../../utils/errorDataAddUser";

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

export const StudentAddForm = ({isOpen, onClose}: Props) => {

    const [inputValues, setInputValues] = useState({
        name: '',
        last_name: '',
        email: '',
    })

    const [inputTouchedCount, setInputTouchedCount] = useState(initialStateTouchCount);

    const handleInputChange = (e) => {
        setInputValues(prev => ({
                ...prev,
                [e.target.name] : e.target.value
        }))
        setInputTouchedCount(prev => ({
            ...prev,
            [e.target.name]: prev[e.target.name] + 1,
        }));
    }


    const isError = errorDataAddUser(inputTouchedCount, inputValues);

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent  color="gray.500">
                <ModalCloseButton/>
                <ModalHeader>Add new student to </ModalHeader>

                <ModalBody>
                   <> {userFormData.map(oneForm => (
                        <FormField
                            key={oneForm.title}
                            type={oneForm.type}
                            name={oneForm.name}
                            label={oneForm.title}
                            value={inputValues[oneForm.name]}
                            onChange={handleInputChange}
                            errorMessage={oneForm.errorMessage}
                            error={isError[oneForm.name]}
                        />
                    ))} </>
                </ModalBody>

                <ModalFooter>footer </ModalFooter>
            </ModalContent>
        </Modal>
    )
}