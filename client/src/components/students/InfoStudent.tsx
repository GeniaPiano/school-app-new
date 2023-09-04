import {
    Badge,
    Box,
    Flex,
    GridItem,
    Heading,
    ModalBody,
    ModalCloseButton,
    ModalHeader,
    SimpleGrid,
    Text
} from "@chakra-ui/react";
import {CourseEntity} from "../../types/course";
import {StudentEntity} from "../../types/student";
import {firstLetterToUpper} from "../../utils/firstLetterToUpper";
import {CourseFormDiv} from "../common/CourseFormDiv";
import {usePostingData} from "../../provider/PostingDataProvider";
import {ConfirmTextAndIcon} from "../common/ConfirmTextAndIcon";


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
                    <Flex flexDir="column"   mb={4} mt={2}>
                        <>{selectedCourses.length > 0
                            ? (
                                <SimpleGrid  columns={3}
                                             spacing={4}
                                             color="gray.500" >
                                    <> { selectedCourses.map(course =>
                                        <CourseFormDiv key={course.id} as={GridItem}
                                        >
                                            <Flex
                                                p={2}
                                                justifyContent="center"
                                                alignItems="center"
                                                borderRadius="8px"
                                                textAlign="center"
                                            >
                                                {course.name}</Flex>
                                        </CourseFormDiv> ) } </>
                                </SimpleGrid>
                            )
                        : <p color="gray.500">no selected courses.</p>} </>
                    </Flex>
                    <Box mt="40px" pb={6} color="gray.500">
                        <Badge mb={2} colorScheme='pink' >email</Badge>
                        <p>{student.email}</p>
                    </Box>
        </ModalBody> </>
)
}