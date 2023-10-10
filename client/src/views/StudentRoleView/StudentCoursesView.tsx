import {
    Box,
    Card,
    CardBody,
    HStack,
    CardHeader,
    Flex,
    Heading,
    SimpleGrid,
    Button,
    AccordionItem, Accordion, AccordionButton, AccordionIcon, AccordionPanel, GridItem
} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {CoursesForStudentResponse} from "../../types/course";
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
},[getCoursesForStudent])

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

                <SimpleGrid  columns={{base: 1, md: 3, lg: 4}} spacing={4} my={5}>
                    {coursesAvailable.length > 0 && coursesAvailable.map((course)=> (
                        <GridItem key={course.id} >
                            <Card bg="brand.400" key={course.id} color="gray" minWidth="200px">
                                <CardHeader>
                                    <Heading size='s'>{firstLetterToUpper(course.name)}</Heading>
                                </CardHeader>
                                <CardBody>
                                    <Button mb={5}>buy now</Button>
                                    <HStack justifyContent="space-around" mb={5}>
                                        <Box>
                                            {course.price} $
                                        </Box>
                                        <Flex>
                                            <StarIcon color="pink.400"/>
                                            <StarIcon color="pink.400"/>
                                            <StarIcon color="pink.400"/>

                                        </Flex>
                                    </HStack>

                                       <Accordion allowToggle >
                                            <AccordionItem>
                                                <h2>
                                                    <AccordionButton>
                                                        <Box as="span" flex='1' textAlign='left'>
                                                            info
                                                        </Box>
                                                        <AccordionIcon />
                                                    </AccordionButton>
                                                </h2>
                                                <AccordionPanel pb={4} width='100%'>
                                                    {course.description
                                                        ? course.description
                                                        : 'comming soon...'}
                                                </AccordionPanel>
                                            </AccordionItem>
                                        </Accordion>



                                </CardBody>
                            </Card>
                        </GridItem>
                    ))}
                </SimpleGrid>



            </Box>
        </Flex>
    )
}