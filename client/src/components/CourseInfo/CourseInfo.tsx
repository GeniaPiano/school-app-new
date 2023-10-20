import {
    AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogOverlay,
    Box,
    Button,
    Flex,
    Modal,
    ModalCloseButton,
    ModalContent,
    ModalOverlay, ModalProps,
    useDisclosure
} from "@chakra-ui/react";
import {useNavigate } from "react-router-dom"
import {useCourses} from "../../hooks/useCourses";
import {ChangeEvent, useEffect, useRef, useState} from "react";
import {GetSingleCourseResponse} from "../../types/course";
import {useCourseInfo} from "../../providers/CourseProvider";
import {useTeachers} from "../../hooks/useTeachers";
import {TeacherEntity} from "../../types/teacher";
import {useCounter} from "../../providers/CounterPovider";
import {Loader} from "../common/Loader";
import { CheckIcon} from "@chakra-ui/icons";
import {UpdateCourseForm} from "./UpdateCourseForm";
import {BasicInfo} from "./BasicInfo";
import {ModalUpdated} from "./ModalUpdated";
import {ModalPosting} from "./ModalPosting";
import {ModalWarning} from "./ModalWarning";
import {ModalConfirmation} from "./ModalConfirmation";

interface InitialFormState {
    name: string;
    teacher: { id: string | null };
    description: string;
    price: string;
    photoUrl: string;
}

export const CourseInfo = () => {
    const navigate = useNavigate();
    const [courseData, setCourseData] = useState<GetSingleCourseResponse>(null);
    const [teachers, setTeachers] = useState<TeacherEntity[] | []>([])
    const [selectTeacher, setSelectTeacher] = useState<string | null>(null)
    const [name, setName] = useState<string>('')
    const [price, setPrice] = useState('')
    const [initialFormData, setInitialFormData] = useState< InitialFormState | null> (null);
    const [message, setMessage] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [photoUrl, setPhotoUrl] = useState('')

    const handleSelectPhotoUrl = (url: string) => setPhotoUrl(url);

    const handleDescription = (e:ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value)
    }
    const handleSelectPrice = (newPrice: string) => {
        setPrice(newPrice)
    }

    const { isOpen, closeModal, courseId, isEditing, changeIsPosted, changeIsEditing, isLoadingEvent, changeIsLoadingEvent, isPostedEvent, changeIsPostedEvent,
        isPosted, isConfirmed, toggleIsConfirmed, isDelete, changeIsDelete, changeConfirmClose, confirmClose} = useCourseInfo();

    const {updateCourse, deleteCourse} = useCourses();
    const {incrementCourseCounter, counterCourse} = useCounter()
    const {getCourseById} = useCourses();
    const {getAllTeachers} = useTeachers();
    const { onClose } = useDisclosure()
    const cancelRef = useRef() as  NonNullable<ModalProps["initialFocusRef"]>
    const cancelRef2 = useRef() as  NonNullable<ModalProps["initialFocusRef"]>


    useEffect(() => {
        if (isOpen && courseId) {
            (async () => {
                try {
                    const results = await getCourseById(courseId);
                    setCourseData(results);
                    setPhotoUrl(results.course.photoUrl)
                    setName(results.course.name)
                    setPrice(String(results.course.price))
                    setDescription(results.course.description === null ? '' : results.course.description)
                    setSelectTeacher(results.teacher ? results.teacher.id : null)
                    setInitialFormData((prev) => {
                        return {
                            ...prev,
                            name: results.course.name,
                            teacher: {id: results.teacher ? results.teacher.id : null},
                            description: results.course.description ? description : '',
                            price: String(results.course.price),
                            photoUrl: results.course.photoUrl,
                        }
                    })
                } catch (error) {
                    console.error(error);
                }
            })();
        }
    }, [isOpen, courseId, counterCourse, setDescription])

    useEffect(()=> {
        if (isOpen) {
            (async () => {
                try {
                    const results = await getAllTeachers('');
                    setTeachers(results)
                } catch (err) {
                    console.log(err)
                }
            })()
        }
    },[isOpen])

    const handleInputChange = (e) => {
        setName(e.target.value)
    }

    const handleSelectChange = (e) => {
        setSelectTeacher(e.target.value)
        }

    const cancelEditing =()=>{
        changeIsEditing(false)
        setName(name)
        }

    // sprawdzenie czy są wprowadzone zmiany w form
    const checkDifference = () => {
        if (!initialFormData) {
            return "noDiff";
        }
        const isPhotoUrlDifferent = photoUrl !== initialFormData.photoUrl
        const isNameDifferent = name !== initialFormData.name;
        const isTeacherDifferent = selectTeacher !== initialFormData.teacher.id;
        const isDescriptionDifferent = description !== initialFormData.description;
        const isPriceDifferent = price !== initialFormData.price;
        if (isNameDifferent || isTeacherDifferent || isDescriptionDifferent || isPriceDifferent || isPhotoUrlDifferent) {
            return "diff";
        }
        return "noDiff";
    };

    const handleSubmit = async() => {
        console.log('checkDiff',checkDifference())
        if (checkDifference() === 'noDiff') {
            setMessage('No changes have been made.')
            setTimeout(()=> {
                setMessage(null)
            },3000)
            return
        }
        const response = await updateCourse(courseId, name, selectTeacher, description, price, photoUrl )
        if (response.success) {
            changeIsEditing(false)
            changeIsPosted(true)
            toggleIsConfirmed()


            setTimeout(()=>{
                toggleIsConfirmed()
            }, 1000)
            setTimeout(()=> {
                changeIsPosted(false)
                incrementCourseCounter()
            }, 2000)
        }
    }

    const handleCloseModal = () => {
        if (isEditing) {
            const diff = checkDifference()
            if (diff === 'diff') {
               changeConfirmClose(true)
            } else {
                closeModal()
            }
        } else {
            closeModal()
        }
    }


    const handleDeleteCourse = async() => {
        const {id} = courseData?.course
        if(id) {
            try {
                const response = await deleteCourse(id)
                if (response.success) {
                    changeIsPostedEvent(true)
                    changeIsLoadingEvent(true)
                    closeModal();

                    setTimeout(() => {
                        changeIsLoadingEvent(false);
                         // zamknięcie alertu po skonczeniu operacji
                    }, 1500);

                    setTimeout(()=> {
                        changeIsPostedEvent(false);
                        toggleIsConfirmed();

                        incrementCourseCounter();
                        navigate('/courses')

                    }, 2500);
                }
            } catch (err) {
                console.log(err)
            }
        }

    }

    return (
        <>
        <Modal isOpen={isOpen} onClose={handleCloseModal} colorScheme="teal">
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton color="gray.500" />
                {courseData && (
                    isEditing
                        ?   <UpdateCourseForm course={courseData.course}
                                              handleInputChange={handleInputChange}
                                              handleSelectChange={handleSelectChange}
                                              description={description}
                                              handleDescription={handleDescription}
                                              name={name}
                                              price={price}
                                              handleSelectPrice={handleSelectPrice}
                                              teachers={teachers}
                                              selectTeacher={selectTeacher}
                                              handleSubmit={handleSubmit}
                                              cancelEditing={cancelEditing}
                                              message={message}
                                              photoUrl={photoUrl}
                                              handleSelectPhotoUrl={handleSelectPhotoUrl}
                            />
                        :  <> { isPosted
                            ? ( !isConfirmed ?  <ModalUpdated/> : <ModalPosting/> )
                            :  <>
                                {isDelete ?  (courseData.countStudents > 0
                                   ? <ModalWarning name={courseData.course.name}  closeModal={closeModal}/>
                                   : <ModalConfirmation name={courseData.course.name}
                                                        closeModal={closeModal}
                                                        handleDeleteCourse={handleDeleteCourse}
                                                        changeIsDelete={changeIsDelete}/> )
                                    : <BasicInfo courseData={courseData}/> }
                            </>
                    } </>
                )}



            </ModalContent>
        </Modal>

           <> {isPostedEvent &&  (
                <AlertDialog
                isOpen={isPostedEvent}
                leastDestructiveRef={cancelRef}
                onClose={onClose}>
                <AlertDialogOverlay>
                    <AlertDialogContent>
                       <AlertDialogBody justifyContent="center" py={15}>
                           {isLoadingEvent ? <Loader colorScheme="red" loadingText='deleting...' />
                             :(<Flex justifyContent='center' alignItems="center" gap={25}>
                                 <Box color='teal'>deleted</Box>
                                 <CheckIcon color="teal"/>
                            </Flex>) }
                       </AlertDialogBody>
                    </AlertDialogContent>
                </AlertDialogOverlay>
                </AlertDialog>
            )} </>

            {confirmClose && (
             <AlertDialog isOpen={confirmClose} onClose={onClose} leastDestructiveRef={cancelRef2} >
                 <AlertDialogOverlay>
                     <AlertDialogContent>
                         <AlertDialogBody>
                              Are you sure you want to leave without saving data?
                         </AlertDialogBody>

                         <AlertDialogFooter>
                             <Button
                                 ref={cancelRef2}
                                 onClick={() => {
                                     onClose();
                                     closeModal();
                                     changeConfirmClose(false);
                                 }}
                             >
                                 Yes, leave.
                             </Button>
                             <Button colorScheme='pink' onClick={() => changeConfirmClose(false)} ml={3}>
                                 No, come back to form.
                             </Button>
                         </AlertDialogFooter>
                     </AlertDialogContent>
                 </AlertDialogOverlay>
             </AlertDialog>
            )}
    </>
    )
}