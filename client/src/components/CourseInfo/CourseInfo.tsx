import {
    Badge, Button, HStack,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
} from "@chakra-ui/react";
import {useCourses} from "../../hooks/useCourses";
import {FC, useEffect, useState} from "react";
import {GetSingleCourseRes} from "../../types/course";
import {useCourseInfo} from "../../providers/CourseProvider";
import {firstLetterToUpper} from "../../utils/firstLetterToUpper";
import {FormField} from "../FormField/FormField";
import {SelectForm} from "../FormSelect/SelectForm";
import {useTeachers} from "../../hooks/useTeachers";
import {TeacherEntity} from "../../types/teacher";
import {useCounter} from "../../providers/CounterPovider";
import {Loader} from "../common/Loader";


interface Props {
}

export const CourseInfo :FC<Props> = ({}) => {

    const [courseData, setCourseData] = useState<GetSingleCourseRes | null>(null);
    const { isOpen, closeModal, courseId, isEditing,changeIsPosted, changeIsEditing, isPosted } = useCourseInfo();
    const [teachers, setTeachers] = useState<TeacherEntity[] | []>([])
    const [selectTeacher, setSelectTeacher] = useState<string | null>(null)
    const {updateCourse} = useCourses();
    const [name, setName] = useState<string>(courseData? courseData.course.name : '')

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


    const cancelEditing =()=>{
        changeIsEditing(false)
        setName(name)
    }

    const handleSubmit = async() => {
        const response = await updateCourse(courseId, name, selectTeacher)
        if (response.success) {
            incrementCourseCounter()
            changeIsEditing(false)
            changeIsPosted(true)
            setTimeout(()=> {
                changeIsPosted(false)
            }, 3000)

        }


    }

    return (
        <Modal isOpen={isOpen} onClose={closeModal} colorScheme="teal">
            <ModalOverlay />
            <ModalContent>

                <ModalCloseButton color="gray.500" />
                {courseData && (
                    isEditing
                        ? <>
                            <ModalHeader color="teal"> {courseData.course.name} </ModalHeader>
                            <ModalBody color="Gray">
                                <form>
                                    <FormField value={name}
                                               onChange={(e)=>setName(e.target.value)} name="name"
                                               type="text"
                                               errorMessage="Name is required and must contain from 2 to 40 chars."
                                               error={name.length < 3}
                                               label="Course name"
                                     />
                                    <SelectForm label="Teacher" handleChange={(e)=> setSelectTeacher(e.target.value)}  data={teachers} placeholder="Select/change teacher"/>
                                </form>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="gray.600" mr={3} onClick={cancelEditing}>Cancel</Button>
                                <Button color="gray.600" onClick={handleSubmit}>Save</Button>
                            </ModalFooter>
                        </>
                        :  <> {isPosted
                            ? <ModalBody>
                                <Loader colorScheme="red" loadingText='posting...' />
                            </ModalBody>
                            : <>
                                    <ModalHeader mb={8} color="teal">
                                        <Badge colorScheme="teal" mr={3}  fontSize='0.8em'>course</Badge>
                                        {courseData.course.name}
                                    </ModalHeader>
                                    <ModalBody>
                                        <HStack mb={2}>
                                            <Badge colorScheme="pink" mr={2}>Number of students </Badge>
                                            <Text> {courseData.countStudents} </Text>
                                        </HStack>
                                        <HStack mb={2}>
                                            <Badge colorScheme="pink" mr={50}>Teacher name </Badge>
                                            <Text> {courseData.teacher !== null
                                                ? `${firstLetterToUpper(courseData.teacher.name)} ${firstLetterToUpper(courseData.teacher.last_name)}`
                                                : 'not assigned'} </Text>
                                        </HStack>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="gray.600" onClick={()=> changeIsEditing(true)}>Edit</Button>
                                    </ModalFooter>
                                </>

                        } </>
                )}
            </ModalContent>
        </Modal>
    )
}