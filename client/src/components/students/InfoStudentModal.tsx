import {Box, Flex, GridItem, Heading, ModalBody, ModalCloseButton, ModalHeader, SimpleGrid} from "@chakra-ui/react";
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

export const InfoStudentModal = (props: Props) => {
    const {student, selectedCourses} = props
    const {isPostedData} = usePostingData()

    return ( <>

        <ModalHeader color="gray.500">
           <> {isPostedData? <ConfirmTextAndIcon text="Updated" withLayer={true} /> : null} </>
            {firstLetterToUpper(student.name)} {firstLetterToUpper(student.last_name)}
        </ModalHeader>
            <ModalCloseButton />
                <ModalBody>

                    <Flex flexDir="column"
                          my={4}>
                        <Heading color="gray.500" as="h3" size="sm" fontWeight="500" mb={5}>courses:</Heading>
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
                        <Heading as="h3" size="sm" fontWeight="500" >email:</Heading>
                        <p>{student.email}</p>
                    </Box>
        </ModalBody> </>
)
}