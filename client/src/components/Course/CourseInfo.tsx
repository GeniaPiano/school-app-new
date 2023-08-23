import {Modal, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useSafeLayoutEffect} from "@chakra-ui/react";
import {useCourses} from "../../hooks/useCourses";
import {useEffect, useState} from "react";
import {GetSingleCourseRes} from "../../types/course";

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
    }, [])

      return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>
                    <>{courseData ? courseData.course.name :  null}</>
                </ModalHeader>
                <ModalCloseButton color="gray.500"/>
            </ModalContent>
        </Modal>
    )
}