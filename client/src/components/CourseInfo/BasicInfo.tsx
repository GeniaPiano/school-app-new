import {Badge, Button, HStack, ModalBody, ModalFooter, ModalHeader, Text} from "@chakra-ui/react";
import {firstLetterToUpper} from "../../utils/firstLetterToUpper";
import {useCourseInfo} from "../../providers/CourseProvider";
import {GetSingleCourseRes} from "../../types/course";


interface Props {
    courseData: GetSingleCourseRes | null;
}
export const BasicInfo = ({courseData }: Props) => {

    const {changeIsEditing, changeIsDelete} = useCourseInfo();
    return (
        <>
            <ModalHeader mb={8} color="teal">
                <Badge colorScheme="teal" mr={3}  fontSize='0.8em'>course</Badge>
                {courseData.course.name}
            </ModalHeader>
            <ModalBody>
                <HStack mb={2}>
                    <Badge colorScheme="pink" mr={2}>Number of students </Badge>
                    <Text> {courseData.course.countStudents} </Text>
                </HStack>
                <HStack mb={2}>
                    <Badge colorScheme="pink" mr={50}>Teacher name </Badge>
                    <Text> {courseData.teacher !== null
                        ? `${firstLetterToUpper(courseData.teacher.name)} ${firstLetterToUpper(courseData.teacher.last_name)}`
                        : 'not assigned'} </Text>
                </HStack>
            </ModalBody>
            <ModalFooter>
                <Button color="gray.600" mr={3} onClick={()=> changeIsEditing(true)}>Edit</Button>
                <Button  color="pink.500" onClick={()=> changeIsDelete(true)}>Delete</Button>
            </ModalFooter>
        </>
    )
}