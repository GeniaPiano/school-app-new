import {
    Badge,
    Box,
    Button,
    Flex,
    ModalBody,
    ModalCloseButton, ModalFooter,
    ModalHeader,
    Text
} from "@chakra-ui/react";
import {firstLetterToUpper} from "../../utils/firstLetterToUpper";
import {TeacherEntity} from "../../types/teacher";
import {CourseEntity} from "../../types/course";
import {useFormState} from "../../providers/FormStateProvider";
import {SelectedCoursesInfo} from "../SelectedCoursesInfo/SelectedCoursesInfo";
import {ConfirmTextAndIcon} from "../common/ConfirmTextAndIcon";
import {usePostingData} from "../../providers/PostingDataProvider";

interface Props {
    teacher: TeacherEntity;
    selectedCourses: CourseEntity[];
}

export const InfoTeacher = ({teacher, selectedCourses}: Props) => {

    const {changeIsEditing} = useFormState();
    const {isPostedData} = usePostingData();

    return (
        <>
        <ModalCloseButton/>
        <ModalHeader as={Flex} alignItems="center"  color="gray.500">
            <> {isPostedData? <ConfirmTextAndIcon text="Updated" withLayer={true} /> : null} </>
            <Text> {firstLetterToUpper(teacher.name)} {firstLetterToUpper(teacher.last_name)} </Text>
            <Badge ml={5} colorScheme='teal' >teacher</Badge>

        </ModalHeader>
        <ModalBody>
            <Badge  colorScheme='pink'>courses</Badge>
            <SelectedCoursesInfo data={selectedCourses} />

               <Box mt="40px" pb={6} color="gray.500" position="relative">
                    <Badge  mb={2} colorScheme='pink' >email</Badge>
                    <p>{teacher.email}</p>
                </Box>

            <ModalFooter>
                <Button
                        color="gray.500"
                        colorScheme='gray'
                        onClick={()=> changeIsEditing(true)}>
                    Edit
                </Button>
            </ModalFooter>
    </ModalBody>
    </>)
}