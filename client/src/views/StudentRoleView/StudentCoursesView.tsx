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
    AccordionItem,
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionPanel,
    GridItem,
    TabPanel,
    TabPanels,
    Tab,
    Tabs,
    TabList, Text, Stack, useColorModeValue
} from "@chakra-ui/react";
import {firstLetterToUpper} from "../../utils/firstLetterToUpper";
import { StarIcon} from "@chakra-ui/icons";
import {useCoursesForOneStudent} from "../../hooks/useCoursesForOneStudent";
import {useAuth} from "../../hooks/useAuth";
import {formatDate, getExpireDate} from "../../utils/date-functions";





export const StudentCoursesView = () => {
const {user} = useAuth();
const {courses} = useCoursesForOneStudent(user?.id);
const {coursesAvailable, coursesChosen} = courses

    return (
        <Flex color="gray.500" h="95vh" mt="2.5vh" width="80%" flexDir="column" mb="5em" mr="4.5em">
            <Box>
                <Heading mr={30}
                         color="gray.500"
                         m="20px 0 30px"
                         fontWeight="400"
                         fontSize="xx-large"
                         as="h1"> Courses
                </Heading>

                <Tabs  variant='enclosed' isFitted>
                    <TabList >
                        <Tab _selected={{color: 'white', bg: 'myPink.400'}}>YOUR COURSES</Tab>
                        <Tab _selected={{color: 'white', bg: 'brand.600'}} >BUY COURSES</Tab>
                    </TabList>

                    <TabPanels mt={5}>
                        <TabPanel >
                            <SimpleGrid  columns={{base: 1, md: 2, lg: 3}} spacing={4} my={5} gap={3}>
                                    {
                                        coursesChosen.length > 0 && coursesChosen.map(course =>
                                            <GridItem key={course.id}>
                                                <Card
                                                    bg={useColorModeValue('myPink.100', 'myPink.50')}
                                                                                                        key={course.id} color="gray"
                                                    minWidth="200px">
                                                    <CardHeader as={Flex} justifyContent="space-between" color="gray.600" fontWeight="500" fontSize="larger">
                                                        <Heading as="h3" size='s'>{firstLetterToUpper(course.name)}</Heading>
                                                        <Flex flexDirection="column" alignItems="flex-end">
                                                            <Flex mr={2}>
                                                                <StarIcon color="brand.800"/>
                                                                <StarIcon color="brand.800"/>
                                                                <StarIcon color="brand.800"/>
                                                            </Flex>
                                                            <Button mt={5}
                                                                    color={useColorModeValue('brand.800', 'gray.50')}
                                                                    bg={useColorModeValue('gray.50', 'gray.400')}
                                                                    size="sm">leave rating</Button>
                                                        </Flex>
                                                    </CardHeader>
                                                    <CardBody>
                                                        <Stack>
                                                            <Stack >
                                                                <Text>bought for: {course.price} $</Text>
                                                                <Text> started at: {formatDate(course.startedAt)}</Text>
                                                                <Text color="gray.500"> expires at: {formatDate(getExpireDate(new Date(course.startedAt)))} </Text>
                                                            </Stack>
                                                        </Stack>
                                                    </CardBody>
                                                </Card>
                                            </GridItem>)
                                    }
                            </SimpleGrid>


                        </TabPanel>

                        <TabPanel>
                            <SimpleGrid  columns={{base: 1, md: 2, lg: 3}} spacing={4} my={5} gap={3}>
                                {coursesAvailable.length > 0 && coursesAvailable.map((course)=> (
                                    <GridItem key={course.id}  >
                                        <Card bg="brand.400" key={course.id} color="gray" minWidth="200px">
                                            <CardHeader>
                                                <Heading size='s'>{firstLetterToUpper(course.name)}</Heading>
                                            </CardHeader>
                                            <CardBody>
                                                <Button mb={5} size="sm"
                                                        color={useColorModeValue('gray.600', 'gray.50')}
                                                        bg={useColorModeValue('gray.50', 'gray.500')}
                                                        _hover={{bg: useColorModeValue('white', 'gray.400' )}}>
                                                    buy now
                                                </Button>
                                                <HStack justifyContent="space-between" mb={5} mx={3}>
                                                    <Box>
                                                        {course.price} $
                                                    </Box>
                                                    <Flex>
                                                        <StarIcon color="myPink.500"/>
                                                        <StarIcon color="myPink.500"/>
                                                        <StarIcon color="myPink.500"/>
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

                        </TabPanel>
                    </TabPanels>

                </Tabs>





            </Box>
        </Flex>
    )
}