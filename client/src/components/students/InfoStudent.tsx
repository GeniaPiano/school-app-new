import {
    Badge,
    Box,
    Flex,
    ModalBody,
    ModalCloseButton,
    ModalHeader,
    Text
} from "@chakra-ui/react";
import {CourseEntity} from "../../types/course";
import {StudentEntity} from "../../types/student";
import {firstLetterToUpper} from "../../utils/firstLetterToUpper";
import {usePostingData} from "../../providers/PostingDataProvider";
import {ConfirmTextAndIcon} from "../common/ConfirmTextAndIcon";
import {SelectedCoursesInfo} from "../SelectedCoursesInfo/SelectedCoursesInfo";


interface Props {
    student: StudentEntity;
    selectedCourses: CourseEntity[];
}

export const InfoStudent = (props: Props) => {
    const {student, selectedCourses} = props
    const {isPostedData} = usePostingData()

    return ( <>

        <ModalHeader  as={Flex} alignItems="center"  color="gray.500">
           <> {isPostedData? <ConfirmTextAndIcon text="Updated" withLayer={true} /> : null} </>
            <Text>{firstLetterToUpper(student.name)} {firstLetterToUpper(student.last_name)} </Text>
            <Badge ml={5} colorScheme='teal' >student</Badge>
        </ModalHeader>
            <ModalCloseButton />
                <ModalBody>
                    <Badge colorScheme='pink'> courses </Badge>
                    <SelectedCoursesInfo data={selectedCourses} />
                    <Box mt="40px" pb={6} color="gray.500">
                        <Badge mb={2} colorScheme='pink' >email</Badge>
                        <p>{student.email}</p>
                    </Box>
        </ModalBody>
</>
)
}