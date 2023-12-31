import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from "@chakra-ui/react";
import {userFormData} from "../../utils/userFormData";
import {FormField} from "../FormField/FormField";
import {useEffect, useState} from "react";
import {initialStateTouchCount, initialStateUser} from "../../utils/initialState";
import {errorDataAddUser} from "../../utils/errorDataAddUser";
import {CourseEntity} from "../../types/course";
import {useCourses} from "../../hooks/useCourses";
import {useError} from "../../providers/ErrorProvider";
import {usePostingData} from "../../providers/PostingDataProvider";
import {ConfirmationBeforeClosing} from "../confirmations/ConfirmationBeforeClosing";
import {useFormState} from "../../providers/FormStateProvider";
import {useCounter} from "../../providers/CounterPovider";
import {useStudents} from "../../hooks/useStudents";
import {ErrorText} from "../common/ErrorText";

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

export const StudentAddForm = ({isOpen, onClose}: Props) => {
    const {getAllCourses} = useCourses();
    const {dispatchError, error} = useError();
    const {changeIsPostedData, dispatchText} = usePostingData();
    const {addStudent} = useStudents();
    const {handleModalCloseBtn, openConfirmation, closeConfirmation} = useFormState();
    const {incrementStudentCounter} = useCounter();

    const [inputValues, setInputValues] = useState(initialStateUser)
    const [inputTouchedCount, setInputTouchedCount] = useState(initialStateTouchCount);
    const [availableCourses, setAvailableCourses] = useState<CourseEntity[] | []>([])
    const [selectedCourses, setSelectedCourses] = useState<CourseEntity[] | []>([])

    useEffect(()=> {
        (async() => {
            const res = await getAllCourses();
            setAvailableCourses(res)
        })()
    }, [])

    const handleInputChange = (e) => {
        const {name, value} = e.target
        setInputTouchedCount(prev => ({
            ...prev,
            [name]: prev[name] + 1,
        }));
        setInputValues( prev => ({
            ...prev,
            [name] : value
        }))
    }

    const setTouchedCount = (field, count) => {
        setInputTouchedCount(prev => ({
            ...prev,
            [field]: count
        }));
    };
    const handleSubmit = async(e)=> {
        e.preventDefault();
        if (inputValues.name === '') {
            setTouchedCount('name', 3);
        }
        if (inputValues.last_name === '') {
            setTouchedCount('last_name', 3);
        }
        if (inputValues.email === '') {
            setTouchedCount('email', 4);
        }

        try {
            const res = await addStudent(inputValues, selectedCourses)
            if (res.success) {
                changeIsPostedData(true);
                dispatchText("Student has been added.")
                setTimeout(()=> {
                    onClose();
                    changeIsPostedData(false)
                    incrementStudentCounter();
                }, 3000)
            }

        } catch (err) {
            dispatchError(err.response.data.message);
        }
    }

    const isError = errorDataAddUser(inputTouchedCount, inputValues);
    const handleConfirmModalClose = (shouldClose) => {
        closeConfirmation();
        if (shouldClose) {
            onClose();
            setInputValues({name: '', last_name: '', email: ''});
            setInputTouchedCount(initialStateTouchCount);
        } else {
            closeConfirmation();
        }
    }

    const handleCloseMainModal = () => {
        openConfirmation();
        if (inputTouchedCount.name > 0  ) {
            openConfirmation();
        }  else {
            closeConfirmation();
            setInputValues(initialStateUser);
            setSelectedCourses([]);
            incrementStudentCounter();
            onClose();
        }
    };

    return (
        <>
        <Modal isOpen={isOpen} onClose={handleModalCloseBtn}>
            <ModalOverlay />
            <ModalContent  color="gray.500">
                <ModalCloseButton onClick={handleCloseMainModal}/>
                <ModalHeader>Add new student</ModalHeader>
                <ModalBody>
                    <form>
                       {userFormData.map(oneForm => (
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
                        ))}
                    </form>
                    {error && <ErrorText text={error}/>}
                </ModalBody>
                <ModalFooter>
                    <Button mb={8} onClick={handleSubmit}>Save</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    <ConfirmationBeforeClosing forAdding={true}  handleConfirmModalCloseForAdding={handleConfirmModalClose}/>
   </>
)
}