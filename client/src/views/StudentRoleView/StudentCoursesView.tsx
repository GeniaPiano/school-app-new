import {Box, Card, CardBody, HStack, CardHeader, Flex, Heading, SimpleGrid, Button} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {CourseEntity, CoursesForStudentResponse} from "../../types/course";
import {useCourses} from "../../hooks/useCourses";
import {useAuth} from "../../hooks/useAuth";
import {firstLetterToUpper} from "../../utils/firstLetterToUpper";
import {StarIcon} from "@chakra-ui/icons";


const initialState = {
    coursesAvailable: [],
    chosenCourses: [],
}

export const StudentCoursesView = () => {

const {user} = useAuth();
const {getCoursesForStudent} = useCourses();
const [courses, setCourses] = useState<CoursesForStudentResponse>(initialState);
const {coursesAvailable, chosenCourses} = courses;

useEffect(()=> {
    (async () => {
        const res = await getCoursesForStudent(user?.id as string)
        setCourses(res)
    })()
},[])

    return (
        <Flex color="gray.500" h="95vh" mt="2.5vh" flexDir="column" mb="5em">
            <Box>
                <Heading mr={30}
                         color="gray.500"
                         m="20px 0 30px"
                         fontWeight="400"
                         fontSize="xx-large"
                         as="h1"> Courses
                </Heading>

                <SimpleGrid columns={{base: 1, md: 3, lg: 4}} spacing={4} my={5}>
                    {coursesAvailable.length > 0 && coursesAvailable.map((course)=> (
                        <Card key={course.id} color="gray" minWidth="200px">
                            <CardHeader>
                                <Heading size='s'>{firstLetterToUpper(course.name)}</Heading>
                            </CardHeader>
                            <CardBody>
                                <HStack justifyContent="space-between">
                                    <Box>
                                        {course.price} $
                                    </Box>
                                    <Flex>
                                        <StarIcon/>
                                        <StarIcon/>
                                        <StarIcon/>
                                    </Flex>
                                </HStack>
                                <Button mt={5}>buy</Button>
                            </CardBody>
                        </Card>
                    ))}
                </SimpleGrid>



            </Box>
        </Flex>
    )
}