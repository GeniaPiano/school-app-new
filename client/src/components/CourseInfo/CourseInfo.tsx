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

    const courseInfo = useCourseInfo();
    const {updateCourse, deleteCourse} = useCourses();
    const {incrementCourseCounter, counterCourse} = useCounter()
    const {getOneAllDetails} = useCourses();
    const {getAllTeachers} = useTeachers();
    const { onClose } = useDisclosure()
    const cancelRef = useRef() as  NonNullable<ModalProps["initialFocusRef"]>
    const cancelRef2 = useRef() as  NonNullable<ModalProps["initialFocusRef"]>


    useEffect(() => {
        if (courseInfo.isOpen && courseInfo.courseId) {
            (async () => {
                try {
                    const results = await getOneAllDetails(courseInfo.courseId);
                    setCourseData(results);
                    setPhotoUrl(results.photoUrl)
                    setName(results.name)
                    setPrice(String(results.price))
                    setDescription(results.description === null ? '' : results.description)
                    setSelectTeacher(results.teacher ? results.teacher.id : null)
                    setInitialFormData((prev) => {
                        return {
                            ...prev,
                            name: results.name,
                            teacher: {id: results.teacher ? results.teacher.id : null},
                            description: results.description ? description : '',
                            price: String(results.price),
                            photoUrl: results.photoUrl,
                        }
                    })
                } catch (error) {
                    console.error(error);
                }
            })();
        }
    }, [courseInfo.isOpen, courseInfo.courseId, counterCourse, setDescription])

    useEffect(()=> {
        if (courseInfo.isOpen) {
            (async () => {
                try {
                    const results = await getAllTeachers('');
                    setTeachers(results)
                } catch (err) {
                    console.log(err)
                }
            })()
        }
    },[courseInfo.isOpen])

    const handleInputChange = (e) => {
        setName(e.target.value)
    }

    const handleSelectChange = (e) => {
        setSelectTeacher(e.target.value)
        }

    const cancelEditing =()=>{
        courseInfo.changeIsEditing(false)
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
        const response = await updateCourse(courseInfo.courseId, name, selectTeacher, description, price, photoUrl )
        if (response.success) {
            courseInfo.changeIsEditing(false)
            courseInfo.changeIsPosted(true)
            courseInfo.toggleIsConfirmed()


            setTimeout(()=>{
                courseInfo.toggleIsConfirmed()
            }, 1000)
            setTimeout(()=> {
                courseInfo.changeIsPosted(false)
                incrementCourseCounter()
            }, 2000)
        }
    }

    const handleCloseModal = () => {
        if (courseInfo.isEditing) {
            const diff = checkDifference()
            if (diff === 'diff') {
                courseInfo.changeConfirmClose(true)
            } else {
                courseInfo.closeModal()
            }
        } else {
            courseInfo.closeModal()
        }
    }


    const handleDeleteCourse = async() => {
        const {id} = courseData
        if(id) {
            try {
                const response = await deleteCourse(id)
                if (response.success) {
                    courseInfo.changeIsPostedEvent(true)
                    courseInfo.changeIsLoadingEvent(true)
                    courseInfo.closeModal();

                    setTimeout(() => {
                        courseInfo.changeIsLoadingEvent(false);
                         // zamknięcie alertu po skonczeniu operacji
                    }, 1500);

                    setTimeout(()=> {
                        courseInfo.changeIsPostedEvent(false);
                        courseInfo.toggleIsConfirmed();

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
        <Modal isOpen={courseInfo.isOpen} onClose={handleCloseModal} colorScheme="teal">
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton color="gray.500" />
                 {courseData && (
                    courseInfo.isEditing
                        ?   <UpdateCourseForm course={courseData}
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
                        :  <> { courseInfo.isPosted
                            ? ( !courseInfo.isConfirmed ?  <ModalUpdated/> : <ModalPosting/> )
                            :  <>
                                {courseInfo.isDelete ?  (courseData.countStudents > 0
                                   ? <ModalWarning name={courseData.name}  closeModal={courseInfo.closeModal}/>
                                   : <ModalConfirmation name={courseData.name}
                                                        closeModal={courseInfo.closeModal}
                                                        handleDeleteCourse={handleDeleteCourse}
                                                        changeIsDelete={courseInfo.changeIsDelete}/> )
                                    : <BasicInfo courseData={courseData}/> }
                            </>
                    } </>
                )}



            </ModalContent>
        </Modal>

           <> {courseInfo.isPostedEvent &&  (
                <AlertDialog
                isOpen={courseInfo.isPostedEvent}
                leastDestructiveRef={cancelRef}
                onClose={onClose}>
                <AlertDialogOverlay>
                    <AlertDialogContent>
                       <AlertDialogBody justifyContent="center" py={15}>
                           {courseInfo.isLoadingEvent ? <Loader colorScheme="red" loadingText='deleting...' />
                             :(<Flex justifyContent='center' alignItems="center" gap={25}>
                                 <Box color='teal'>deleted</Box>
                                 <CheckIcon color="teal"/>
                            </Flex>) }
                       </AlertDialogBody>
                    </AlertDialogContent>
                </AlertDialogOverlay>
                </AlertDialog>
            )} </>

            {courseInfo.confirmClose && (
             <AlertDialog isOpen={courseInfo.confirmClose} onClose={onClose} leastDestructiveRef={cancelRef2} >
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
                                     courseInfo.closeModal();
                                     courseInfo.changeConfirmClose(false);
                                 }}
                             >
                                 Yes, leave.
                             </Button>
                             <Button colorScheme='pink' onClick={() => courseInfo.changeConfirmClose(false)} ml={3}>
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