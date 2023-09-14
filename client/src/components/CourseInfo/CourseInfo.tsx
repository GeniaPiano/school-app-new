import {
     Box, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay } from "@chakra-ui/react";
import {useCourses} from "../../hooks/useCourses";
import {useEffect, useState} from "react";
import {GetSingleCourseRes} from "../../types/course";
import {useCourseInfo} from "../../providers/CourseProvider";
import {useTeachers} from "../../hooks/useTeachers";
import {TeacherEntity} from "../../types/teacher";
import {useCounter} from "../../providers/CounterPovider";
import {Loader} from "../common/Loader";
import {CheckIcon} from "@chakra-ui/icons";
import {EditCourse} from "./EditCourse";
import {BasicInfo} from "./BasicInfo";

export const CourseInfo = () => {

    const [courseData, setCourseData] = useState<GetSingleCourseRes | null>(null);
    const { isOpen, closeModal, courseId, isEditing,changeIsPosted, changeIsEditing, isPosted, isConfirmed, toggleIsConfirmed } = useCourseInfo();
    const [teachers, setTeachers] = useState<TeacherEntity[] | []>([])
    const [selectTeacher, setSelectTeacher] = useState<string | null>(null)
    const {updateCourse} = useCourses();
    const [name, setName] = useState<string>(courseData? courseData.course.name : '')
    const [initialFormData, setInitialFormData] = useState<{
        name: string;
        teacher: { id: string | null };
    } | null>(null);
    const [message, setMessage] = useState<string | null>(null)
    const {incrementCourseCounter, counterCourse} = useCounter()
    const {getCourseById} = useCourses();
    const {getAllTeachers} = useTeachers();


    useEffect(() => {
        if (isOpen && courseId) {
            (async () => {
                try {
                    const results = await getCourseById(courseId);
                    setCourseData(results);
                    setName(results.course.name)
                    setSelectTeacher(results.teacher.id ? results.teacher.id : null)
                    setInitialFormData({
                        name: results.course.name,
                        teacher: { id: results.teacher.id },
                    })
                } catch (error) {
                    console.error(error);
                }
            })();
        }
    }, [isOpen, courseId, counterCourse])

    useEffect(()=> {
        if (isOpen) {
            (async () => {
                try {
                    const results = await getAllTeachers();
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
        const isNameDifferent = name !== initialFormData.name;
        const isTeacherDifferent = selectTeacher !== initialFormData.teacher.id;

        if (isNameDifferent || isTeacherDifferent) {
            return "diff";
        }
        return "noDiff";
    };


    const handleSubmit = async() => {
        if (checkDifference() === 'noDiff') {
            setMessage('No changes have been made.')
            setTimeout(()=> {
                setMessage(null)
            },3000)
            return
        }
        const response = await updateCourse(courseId, name, selectTeacher)
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

    return (
        <Modal isOpen={isOpen} onClose={closeModal} colorScheme="teal">
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton color="gray.500" />
                {courseData && (
                    isEditing
                        ?   <EditCourse  courseName={courseData.course.name}
                                         handleInputChange={handleInputChange}
                                         handleSelectChange={handleSelectChange}
                                         name={name}
                                         teachers={teachers}
                                         selectTeacher={selectTeacher}
                                         handleSubmit={handleSubmit}
                                         cancelEditing={cancelEditing}
                                         message={message} />
                        :  <> { isPosted
                            ? ( !isConfirmed ?
                                <ModalBody p="60px 30px" as={Flex} justifyContent='center' alignItems="center" gap={25}>
                                    <Box color='teal'>Updated</Box>
                                    <CheckIcon color="teal"/>
                                </ModalBody>
                              :  <ModalBody p="60px 30px">
                                    <Loader colorScheme="red" loadingText='posting...' />
                                </ModalBody> )
                            :

                            <BasicInfo courseData={courseData}/>
                    } </>
                )}


            </ModalContent>
        </Modal>
    )
}