import {
    Box,
    Flex,
    Heading,
    TabPanel,
    TabPanels,
    Tab,
    Tabs,
    TabList
} from "@chakra-ui/react";
import {useCoursesForOneStudent} from "../../hooks/useCoursesForOneStudent";
import {useAuth} from "../../hooks/useAuth";
import {CoursesAvailableToBuy} from "../../components/StudentRole/CoursesAvailableToBuy";
import {CoursesBought} from "../../components/StudentRole/CoursesBought";
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
                            <CoursesBought coursesChosen={coursesChosen}/>
                        </TabPanel>
                        <TabPanel>
                            <CoursesAvailableToBuy coursesAvailable={coursesAvailable}/>
                         </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </Flex>
    )
}