import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Text,
} from "@chakra-ui/react";
import {useCourses} from "../../hooks/useCourses";
import {useEffect, useState} from "react";
import {GetSingleCourseRes} from "../../types/course";
import {firstLetterToUpper} from "../../utils/firstLetterToUpper";

interface Props {
    onOpen: ()=> void;
    onClose: ()=> void;
    courseId: string,
}

export const CourseInfo = ({isOpen, onClose, courseId}: Props) => {

    const [courseData, setCourseData] = useState<GetSingleCourseRes | null>(null);

    const {getCourseById} = useCourses();

    useEffect(()=> {
        (async()=> {
           const results = await getCourseById(courseId);
            setCourseData(results)
        })();
    }, [courseId])

      return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay/>
            <ModalContent>
                <ModalCloseButton color="gray.500"/>
               <>{courseData && (
               <>
                   <ModalHeader> {courseData.course.name} </ModalHeader>
                   <ModalBody>
                       <Text> Number of students: {courseData.countStudents} </Text>
                       <Text> Teacher name: {courseData.teacher !== null
                           ? `${firstLetterToUpper(courseData.teacher.name)} ${firstLetterToUpper(courseData.teacher.last_name)}`
                           : 'not assigned'} </Text>
                   </ModalBody>

               </>
                )}</>
            </ModalContent>
        </Modal>
    )
}