
import {ListItem, Button, Text, useDisclosure, Box, HStack } from "@chakra-ui/react";
import {Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton,
} from '@chakra-ui/react'
import {ChangeEvent, ReactNode, SyntheticEvent, useEffect, useState} from "react";
import {CleanedStudent} from "../../types/student";
import {StudentUpdateForm} from "../studentForm/StudentUpdateForm";
import {initialState} from "../studentForm/initialState";
import {CourseEntity} from "../../types/course";
import {useCourses} from "../../hooks/useCourses";
import {useStudents} from "../../hooks/useStudents";
import {InfoStudent} from "./InfoStudent";
import {ConfirmationBeforeClosing} from "../ConfirmationBeforeClosing/ConfirmationBeforeClosing";
import {UserItem} from "../common/UserItem";
import {firstLetterToUpper} from "../../utils/firstLetterToUpper";
import {usePostingData} from "../../providers/PostingDataProvider";
import {ConfirmDeleteStudent} from "../ConfrimDeleteStudent/ConfirmDeleteStudent";
import {GroupButtonsEditSaveCancel} from "./GroupButtonsEditSaveCancel";
import {useFormState} from "../../providers/FormStateProvider";



interface Props {
    studentData: {
        student: CleanedStudent,
        selectedCourses: CourseEntity[],
    };
    mainList: boolean;
    courseName: string;
}

export const StudentsListItem = (props: Props): ReactNode  => {
    const {updateStudentCourses} = useStudents()
    const {getAllCourses} = useCourses();
    const {changeIsPostedData} = usePostingData();
    const {student:studentData, selectedCourses:coursesData} = props.studentData;
    const [student, setStudent] = useState<CleanedStudent>(studentData)
    const [selectedCourses, setSelectedCourses] = useState<CourseEntity[]>(coursesData)
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [availableCourses, setAvailableCourses] = useState < CourseEntity[] | []> ([]);
    const [coursesReadyToUpdate, setCoursesReadyToUpdate] = useState<CourseEntity[]>(selectedCourses);
    const [inputValues, setInputValues] = useState (initialState(student));


    const {isEditing, toggleEditing, changeIsEditing, openConfirmation, closeConfirmation} = useFormState()


    const handleCloseConfirmModal = () => {
       changeIsEditing(false)
       closeConfirmation()

        setInputValues((prev) => ({
            ...prev,
            name: student.name,
            last_name: student.last_name,
            email: student.email,
            })
        );
        setCoursesReadyToUpdate(selectedCourses);
   }


    const handleRemoveCourse = (courseId: string) => {
        const course = coursesReadyToUpdate.find(course => course.id === courseId)
        setCoursesReadyToUpdate(prevSelectedCourses => prevSelectedCourses.filter(course => course.id !== courseId));
        setAvailableCourses(prev => ([...prev, course]))
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setInputValues((prevVal) => ({
            ...prevVal,
            [e.target.name]: e.target.value
        }));
    }



    const handleSelectChange = (e : ChangeEvent<HTMLInputElement>) => {
        const courseId = e.target.value;
        if (availableCourses) {
            const courseToAdd = availableCourses.find(course => course.id === courseId)
            setCoursesReadyToUpdate(prevState => [...prevState, courseToAdd])
            setAvailableCourses(prev => prev.filter(course => course.id !== courseId))
        }
    }

    const handleSubmit = async(e: SyntheticEvent) => {
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
                toggleEditing()
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
        changeIsEditing(false)
        setCoursesReadyToUpdate(selectedCourses);
    }

    return (
        <ListItem>
            <UserItem onOpen={onOpen}>
               <Text   onClick={onOpen}  _hover={{color: "brand.700"}}>
                   {firstLetterToUpper(student.name)} {firstLetterToUpper(student.last_name)}
               </Text>

               <HStack>
                   <Button size="xs" colorScheme="teal"  onClick={onOpen} variant="solid">details</Button>
                   <ConfirmDeleteStudent student={student} mainList={props.mainList} courseName={props.courseName}/>
               </HStack>
            </UserItem>
            <Modal isOpen={isOpen} onClose={isEditing ? openConfirmation : onClose}  >
                <ModalOverlay />
                <ModalContent color="gray.500">
                    <Box> {isEditing
                        ? <> <ModalHeader>Edit data</ModalHeader>
                            <ModalCloseButton/>
                            <ModalBody>
                                <StudentUpdateForm
                                    studentData={props.studentData}
                                    handleSubmit={handleSubmit}
                                    handleInputChange={handleInputChange}
                                    handleRemoveCourse={handleRemoveCourse}
                                    coursesReadyToUpdate={coursesReadyToUpdate}
                                    inputValues={inputValues}
                                    handleSelectChange={handleSelectChange}
                                    availableCourses={availableCourses}/>
                            </ModalBody> </>
                        : <InfoStudent student={student}
                                       selectedCourses={coursesData}
                        /> }
                    </Box>

                    <GroupButtonsEditSaveCancel cancelEditing={cancelEditing}
                                                toggleEditing={toggleEditing}
                                                isEditing={isEditing}
                                                handleSubmit={handleSubmit}
                            />
                  </ModalContent>
                </Modal>
              <ConfirmationBeforeClosing
                     handleCloseConfirmStudentModal={handleCloseConfirmModal}
                          />
           </ListItem>
    )
}