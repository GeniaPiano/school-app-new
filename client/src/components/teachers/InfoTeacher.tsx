import {
    Badge,
    Box,
    Button,
    Flex,
    GridItem,
    ModalBody,
    ModalCloseButton, ModalFooter,
    ModalHeader,
    SimpleGrid,
    Text
} from "@chakra-ui/react";
import {firstLetterToUpper} from "../../utils/firstLetterToUpper";
import {CourseFormDiv} from "../common/CourseFormDiv";
import {TeacherEntity} from "../../types/teacher";
import {CourseEntity} from "../../types/course";
import {useFormState} from "../../provider/FormStateProvider";

interface Props {
    teacher: TeacherEntity;
    selectedCourses: CourseEntity[];
}

export const InfoTeacher = ({teacher, selectedCourses}: Props) => {

    const {changeIsEditing} = useFormState();

    return (
        <>
        <ModalCloseButton/>
        <ModalHeader as={Flex} alignItems="center"  color="gray.500">
            <Text> {firstLetterToUpper(teacher.name)} {firstLetterToUpper(teacher.last_name)} </Text>
            <Badge ml={5} colorScheme='teal' >teacher</Badge>

        </ModalHeader>
        <ModalBody>
            <Badge  colorScheme='pink'>courses</Badge>
             <Flex flexDir="column"
              mb={4} mt={2}>
                    <>{selectedCourses.length > 0
                        ? (
                            <SimpleGrid  columns={3}
                                         spacing={4}
                                         color="gray.500" >
                                <> { selectedCourses.map(course =>
                                    <CourseFormDiv key={course.id} as={GridItem} >
                                        <Flex
                                            p={2}
                                            justifyContent="center"
                                            alignItems="center"
                                            borderRadius="8px"
                                            textAlign="center"
                                        >
                                            {course.name}</Flex>
                                    </CourseFormDiv> )
                                } </>
                            </SimpleGrid>
                        )
                        : <Text color="gray.500">no selected courses.</Text>} </>
                </Flex>
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