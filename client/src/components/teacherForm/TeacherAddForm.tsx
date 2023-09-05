import {
    Box,
    FormControl,
    FormLabel, Modal, ModalFooter,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay, Select, SimpleGrid, useDisclosure, Button
} from "@chakra-ui/react";
import { useEffect, useState} from "react";
import {TeacherFormInputFields} from "./TeacherFormInputFields";
import {useTeachers} from "../../hooks/useTeachers";
import {CourseEntity} from "../../types/course";
import {CourseItem} from "../common/CourseItem";
import {initialStateTeacher, initialStateTouchCount} from "./teacherFormData";
import {errorData} from "./errorData";
import {useError} from "../../provider/ErrorProvider";
import {usePostingData} from "../../provider/PostingDataProvider";
import {useCounter} from "../../provider/CounterPovider";

interface Props {
    onClose: ()=> void;
    isOpen: boolean;
}

export const TeacherAddForm = ({onClose, isOpen}: Props)=> {

    const {dispatchError} = useError();
    const {onClose: closeConfirm} = useDisclosure();
    const {changeIsPostedData} = usePostingData();
    const {incrementTeacherCounter} = useCounter()
    const [inputValues, setInputValues] = useState(initialStateTeacher)
    const [inputTouchedCount, setInputTouchedCount] = useState(initialStateTouchCount);

    const [availableCourses, setAvailableCourses] = useState<CourseEntity[] | []>([])
    const [coursesReadyToUpdate, setCoursesReadyToUpdate] = useState<CourseEntity[] | []>([])
    const [isConfirmationOpen, setIsConfirmationOpen] = useState<boolean>(false)
    const {getAvailableCourses, addNewTeacher } = useTeachers();


    useEffect(()=> {
        (async () => {
            const courses = await getAvailableCourses();
            setAvailableCourses(courses)
        } )()
    },[])


    const isError = errorData(inputTouchedCount, inputValues);

      const handleChangeInputValue = (e) => {
         setInputTouchedCount(prev => ({
             ...prev,
             [e.target.name]: prev[e.target.name] + 1,
         }));

         setInputValues( prev => ({
             ...prev,
             [e.target.name] : e.target.value
         }))
    };

    const handleSelectCourse = (e) => {
        const courseId: string = e.target.value.toString()
        if (availableCourses.length !== 0) {
            const courseToAdd: CourseEntity = availableCourses.find(course => course.id === courseId)
            setCoursesReadyToUpdate(prevState => [...prevState, courseToAdd])
            setAvailableCourses(prev => prev.filter(course => course.id !== courseId))
        }
    }

    const options = availableCourses?.map(course => (
        <option key={course.id} value={course.id} > {course.name} </option>
    ))


    const handleRemoveCourse = (courseId) => {
        setCoursesReadyToUpdate(prevSelectedCourses => prevSelectedCourses.filter(course => course.id !== courseId));
    };

    const selectedCourses = coursesReadyToUpdate?.map(oneCourse => (
        <Box key={oneCourse.id} position="relative" bg="brand.800" color="white" p={3} borderRadius="10px" alignItems="center">
            <CourseItem name={oneCourse.name} courseId={oneCourse.id} handleRemove={handleRemoveCourse} />
        </Box>
    ))


    const setTouchedCount = (field, count) => {
        setInputTouchedCount(prev => ({
            ...prev,
            [field]: count
        }));
    };

    const handleSubmit = async(e) => {
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
            const res = await addNewTeacher(inputValues, coursesReadyToUpdate)
            if (res.success) {
                changeIsPostedData(true);
                setTimeout(()=> {
                    changeIsPostedData(false)
                    incrementTeacherCounter();
                    onClose();
                }, 3000)
            }

        } catch (err) {
            dispatchError(err.response.data.message)
        }
   }


    const handleConfirmModalClose =(shouldClose) => {
        setIsConfirmationOpen(false);
        if (shouldClose) {
            onClose();
            setInputValues({name: '', last_name: '', email: ''})
            setInputTouchedCount(initialStateTouchCount)
        } else {
            setIsConfirmationOpen(false)
        }
    }



    const handleCloseMainModal = () => {

        if (inputTouchedCount.name > 0 ) {
           setIsConfirmationOpen(true)
       }  else {
           setIsConfirmationOpen(false);
           setInputValues(initialStateTeacher);
           onClose();
       }

    };

    return (
        <Modal isOpen={isOpen} onClose={handleCloseMainModal}>
            <ModalOverlay/>
                <ModalContent>
                <ModalHeader>Add new teacher</ModalHeader>
                <ModalCloseButton onClick={handleCloseMainModal}/>
                <ModalBody>
                    <form onSubmit={handleSubmit}>
                        <TeacherFormInputFields
                            inputValues={inputValues}
                            isError={isError}
                            handleChangeInputValue={handleChangeInputValue}
                        />
                        <FormControl mb={8}>
                            <FormLabel>Courses</FormLabel>
                            <Select onChange={handleSelectCourse}
                                    placeholder='Select course'
                                    variant='filled'
                                    outline='none'
                                    focusBorderColor="brand.600"
                            >
                                <>{availableCourses && options}</>
                            </Select>
                        </FormControl>

                        <SimpleGrid columns={3} spacing={4} my={5}>
                            <> {selectedCourses} </>
                        </SimpleGrid>
                        <Button type='submit' mb={35} colorScheme='gray' >save</Button>

                        <Modal onClose={closeConfirm} isOpen={isConfirmationOpen}>
                            <ModalOverlay />
                            <ModalContent>
                                <ModalHeader>Confirmation</ModalHeader>
                                <ModalBody>
                                    Are you sure you want to close without saving changes?
                                </ModalBody>
                                <ModalFooter >
                                    <Button mr={2} colorScheme="gray"  color="gray.600"  onClick={()=> handleConfirmModalClose(true)}>
                                        Yes, Close
                                    </Button>
                                    <Button colorScheme="gray"  color="gray.600"  onClick={()=> handleConfirmModalClose(false)} >
                                        Go back to Form.
                                    </Button>
                                </ModalFooter>
                            </ModalContent>
                        </Modal>

                    </form>
                </ModalBody>


            </ModalContent>
        </Modal>
    )
}