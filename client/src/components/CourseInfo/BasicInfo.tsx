import {Badge, Button, HStack, ModalBody, ModalFooter, ModalHeader, Text} from "@chakra-ui/react";
import {firstLetterToUpper} from "../../utils/firstLetterToUpper";
import {useCourseInfo} from "../../providers/CourseProvider";
import {GetSingleCourseRes} from "../../types/course";
import {HeaderCourseInfo} from "./HeaderCourseInfo";


interface Props {
    courseData: GetSingleCourseRes | null;
}
export const BasicInfo = ({courseData }: Props) => {

    const {changeIsEditing, changeIsDelete} = useCourseInfo();
    return (
        <>
            <HeaderCourseInfo title={courseData?.course.name}/>
            <ModalBody>
                <HStack mb={2}>
                    <Badge colorScheme="pink" mr={2}>Number of students </Badge>
                    <Text> {courseData && courseData.countStudents} </Text>
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