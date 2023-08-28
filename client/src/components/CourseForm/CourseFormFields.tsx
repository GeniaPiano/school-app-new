import {
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Modal, ModalBody,
    ModalContent, ModalFooter, ModalHeader,
    ModalOverlay,
    Select
} from "@chakra-ui/react";
import {firstLetterToUpper} from "../../utils/firstLetterToUpper";
import {useEffect, useState} from "react";
import {TeacherEntity} from "../../types/teacher";
import {useTeachers} from "../../hooks/useTeachers";
import {useCourses} from "../../hooks/useCourses";
import {useCounter} from "../../provider/CounterPovider";
import { useToast } from '@chakra-ui/react'

interface Props {
    isConfirmationOpen: boolean;
    handleCloseConfirmModal: ()=> void;
    handleGoBackToForm: ()=> void;
    handleCloseAfterConfirm: ()=> void;

}

export const CourseFormFields = ({
                                     isConfirmationOpen,
                                     handleCloseConfirmModal,
                                     handleGoBackToForm}: Props) => {

    const [teachers, setTeachers] = useState<TeacherEntity[] | null>(null);
    const [isActive, setIsActive] = useState<boolean>(false)
    const {getAllTeachers} = useTeachers();
    const [courseName, setCourseName] = useState<string>('')
    const [selectTeacherId, setSelectTeacherId] = useState<string>('')
    const {addCourse} = useCourses();
    const {incrementCourseCounter} = useCounter();

    const changeIsActive = (bool: boolean) => {
        setIsActive(bool)
    }


    useEffect(() => {
        (async() => {
            const teachersData = await getAllTeachers();
            setTeachers(teachersData);
        })()
    }, [])


    const [inputTouchedCount, setInputTouchedCount] = useState<number>(0);

    const handleChangeInputValue = (e) => {
        const value = firstLetterToUpper(e.target.value);
        setCourseName(value);
        setInputTouchedCount(prev => prev + 1);
    };


    const handleSubmit = async(e) => {
        e.preventDefault();
        if (courseName.length < 4 || courseName.length > 40 || courseName.length === 0) {
            return
        }
        e.preventDefault();
        try {
            const res = await addCourse(courseName, selectTeacherId);
            incrementCourseCounter();
            setCourseName('');
            setSelectTeacherId('');
            setInputTouchedCount(0)

            console.log('submit  course', res.data)
        }catch (e) {
            console.log(e)
        }
    }

    const options = teachers ? teachers.map(oneTeacher => (
        <option key={oneTeacher.id} value={oneTeacher.id}> {firstLetterToUpper(oneTeacher.name)} {firstLetterToUpper(oneTeacher.last_name)} </option>
    )) : null;


    const isError = (inputTouchedCount > 3 && (courseName === '' || courseName.length < 4 || courseName.length > 40));



    return (
        <form onSubmit={handleSubmit} >
            <FormControl mb={5} isInvalid={isError}>
                <FormLabel>Name</FormLabel>
                <Input
                    value={courseName}
                    onChange={handleChangeInputValue}
                    focusBorderColor="brand.600"/>
                <>{isError &&  <FormErrorMessage> Course name is required. It should contain from 4 to 40 chars.</FormErrorMessage>} </>
            </FormControl>


            <FormControl mb={8}>
                <FormLabel>Teacher</FormLabel>
                <Select onChange={(e)=> setSelectTeacherId(e.target.value)}
                        placeholder='Select teacher'
                        variant='filled'
                        outline='none'
                        focusBorderColor="brand.600"
                >
                    <>{options}</>
                </Select>
            </FormControl>
            <Button type="submit" mb={35}>Save</Button>


            <div>
                <Modal  isOpen={isConfirmationOpen}>
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
            </div>

        </form>
    )
}