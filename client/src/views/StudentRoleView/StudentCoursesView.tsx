import {
    Box,
    Flex,
    Heading,
    TabPanel,
    TabPanels,
    Tab,
    Tabs,
    TabList, useColorModeValue
} from "@chakra-ui/react";
import {useCoursesForOneStudent} from "../../hooks/useCoursesForOneStudent";
import {useAuth} from "../../hooks/useAuth";
import {CoursesStore} from "../../components/StudentRole/CoursesStore";

export const StudentCoursesView = () => {
    const {user} = useAuth();
    const {courses} = useCoursesForOneStudent(user?.id);
    const {coursesAvailable} = courses
    const color = useColorModeValue('gray.600', 'gray.50')
    const bgCard = useColorModeValue('brand.600', 'gray.600')
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
                        <Tab _selected={{color: color, bg: bgCard}} > CHECKOUT NEW CLASSES</Tab>
                    </TabList>
                    <TabPanels mt={5}>
                        <TabPanel>
                            <CoursesStore coursesAvailable={coursesAvailable}/>
                         </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </Flex>
    )
}