import {
    Box,
    Flex,
    Heading,
    TabPanel,
    TabPanels,
    Tab,
    Tabs,
    TabList,
} from "@chakra-ui/react";
import {useCoursesForOneStudent} from "../../hooks/useCoursesForOneStudent";
import {useAuth} from "../../hooks/useAuth";
import {CoursesBought} from "../../components/StudentRole/CoursesBought";
import {StudentRoleUserInfo} from "../../components/StudentRole/StudentRoleUserInfo";

export const StudentAccountView = () => {
    const {user} = useAuth();
    const {courses} = useCoursesForOneStudent(user?.id);
    const {coursesChosen} = courses

    return (
        <Flex color="gray.500" h="95vh"  width="80%" flexDir="column" mb="5em" mr="4.5em">
            <Box>
                <Heading
                         color="gray.500"
                         m="10px 0 10px px"
                         fontWeight="400"
                         fontSize="xx-large"
                         as="h1"> Your account
                </Heading>
                <Tabs  variant='enclosed' isFitted>
                    <TabList >
                        <Tab _selected={{color: 'white', bg: 'myPink.400'}}>YOUR COURSES</Tab>
                        <Tab _selected={{color: 'white', bg: 'brand.600'}} >YOUR DATA</Tab>
                    </TabList>
                    <TabPanels mt={5}>
                        <TabPanel >
                            <CoursesBought coursesChosen={coursesChosen}/>
                        </TabPanel>
                        <TabPanel>
                            <StudentRoleUserInfo user={user}/>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </Flex>
    )
}