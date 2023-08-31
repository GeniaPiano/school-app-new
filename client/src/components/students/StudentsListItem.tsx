
import {ListItem, Button, Text, useDisclosure, Box, createStandaloneToast, Toast} from "@chakra-ui/react";
import {Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
} from '@chakra-ui/react'
import {ChangeEvent, ReactNode, useEffect, useState} from "react";
import {CleanedStudent} from "../../types/student";
import {FormEditStudent} from "../studentForm/FormEditStudent";
import {initialState} from "../studentForm/initialState";
import {CourseEntity} from "../../types/course";
import {useCourses} from "../../hooks/useCourses";
import {useStudents} from "../../hooks/useStudents";
import {InfoStudentModal} from "./InfoStudentModal";
import {ModalFooterButtons} from "./ModalFooterButtons";
import {UserItem} from "../common/UserItem";
import {firstLetterToUpper} from "../../utils/firstLetterToUpper";
import {usePostingData} from "../../provider/PostingDataProvider";


interface Props {
    studentData: {
        student: CleanedStudent,
        selectedCourses: CourseEntity[],
    }
}

export const StudentsListItem = (props: Props): ReactNode  => {
    const {updateStudentCourses} = useStudents()
    const {getAllCourses} = useCourses();
    const {changeIsPostedData} = usePostingData();
    const {student:studentData, selectedCourses:coursesData} = props.studentData;
    const [student, setStudent] = useState<CleanedStudent>(studentData)
    const [selectedCourses, setSelectedCourses] = useState<CourseEntity[]>(coursesData)
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isEditing, setIsEditing] = useState(false);
    const [availableCourses, setAvailableCourses] = useState < CourseEntity[] | null> (null);
    const [coursesReadyToUpdate, setCoursesReadyToUpdate] = useState<CourseEntity[]>(selectedCourses);
    const [inputValues, setInputValues] = useState (initialState(student));
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);


   const handleCloseModal=()=> {
       if (isEditing) {
           setIsConfirmationOpen(true);
       } else {
           onClose();
       }}

   const handleGoBackToEdit = () => {
       setIsConfirmationOpen(false)
   }

    const handleCloseAfterConfirm = () => {
        setIsConfirmationOpen(false);
        if (isEditing) {
            setIsEditing(false);
        } else {
            onClose();
        }};

   const handleCloseConfirmModal = () => {
        setIsConfirmationOpen(false)
        setIsEditing(false)
        setInputValues((prev) => ({
            ...prev,
            name: student.name,
            last_name: student.last_name,
            email: student.email,
            })
        );
        setCoursesReadyToUpdate(selectedCourses);
   }

    const handleRemoveCourse = (courseId) => {
        setCoursesReadyToUpdate(prevSelectedCourses => prevSelectedCourses.filter(course => course.id !== courseId));
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setInputValues((prevVal) => ({
            ...prevVal,
            [e.target.name]: e.target.value
        }));
    }


    const handleSelectChange = (e) => {
        const courseId = e.target.value;
        if (availableCourses) {
            const courseToAdd = availableCourses.find(course => course.id === courseId)
            setCoursesReadyToUpdate(prevState => [...prevState, courseToAdd])
            setAvailableCourses(prev => prev.filter(course => course.id !== courseId))
        }
    }

    const handleSubmit = async(e) => {
        if (inputValues.name.length < 3 || inputValues.last_name.length < 3) {
            return;
        }
        if (inputValues.email.length < 4) {
            return;
        }
       if (isEditing) {
            e.preventDefault();
            try {
                const coursesToSend = coursesReadyToUpdate.map(course => course.id)
                const res = await updateStudentCourses(student.id, inputValues, coursesToSend)
                setIsEditing(prev => !prev)
                await setStudent(res.data.student)
                await setSelectedCourses(res.data.selectedCourses)
                changeIsPostedData(true);
                setTimeout(()=> {
                    changeIsPostedData(false)
                }, 3000)

            } catch (err) {
                console.log(err.response.data)}
        }
    }


    useEffect(() => {
        (async () => {
            const courses = await getAllCourses();
            if (courses) {
                const filteredCourses = courses.filter(course => !coursesReadyToUpdate.some(selectedCourse => selectedCourse.id === course.id));
                setAvailableCourses(filteredCourses);
            }
        })();
    }, []);

    const cancelEditing = () => {
        setIsEditing(false);
        setCoursesReadyToUpdate(selectedCourses);
    }

    return (
        <ListItem>
            <UserItem onOpen={onOpen} >
               <Text>{firstLetterToUpper(student.name)} {firstLetterToUpper(student.last_name)}</Text>
            </UserItem>
            <Modal isOpen={isOpen} onClose={handleCloseModal}  >
                <ModalOverlay />
                <ModalContent color="gray.500">
                    <Box> {isEditing
                        ? <> <ModalHeader>Edit data</ModalHeader>
                            <ModalCloseButton/>
                            <ModalBody>
                                <FormEditStudent
                                    studentData={props.studentData}
                                    handleSubmit={handleSubmit}
                                    handleInputChange={handleInputChange}
                                    handleRemoveCourse={handleRemoveCourse}
                                    coursesReadyToUpdate={coursesReadyToUpdate}
                                    inputValues={inputValues}
                                    handleSelectChange={handleSelectChange}
                                    availableCourses={availableCourses}/>
                            </ModalBody> </>
                        : <InfoStudentModal student={student} selectedCourses={selectedCourses} /> }
                    </Box>

                    <ModalFooter>
                        <Button type={isEditing ? "submit" : "button"}
                                color="gray.500"
                                colorScheme='gray'
                                mr={3}
                                onClick={isEditing? handleSubmit : ()=>setIsEditing(prev => !prev)}>
                            {isEditing ? 'Save' : 'Edit'}
                        </Button>
                        <> {isEditing && (
                            <Button  color="gray.500" mr={3}
                                     colorScheme='gray'
                                     onClick={cancelEditing}
                            >Cancel</Button>
                        )} </>
                    </ModalFooter>
                </ModalContent>
            </Modal>
              <ModalFooterButtons
                isConfirmationOpen={isConfirmationOpen}
                handleCloseConfirmModal={handleCloseConfirmModal}
                handleGoBackToEdit={handleGoBackToEdit}
                handleCloseAfterConfirm={handleCloseAfterConfirm}
            />
           </ListItem>
    )
}