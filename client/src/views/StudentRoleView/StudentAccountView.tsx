import {Box, Flex, Heading, SimpleGrid, Spinner, Text} from "@chakra-ui/react";
import {useAuth} from "../../hooks/useAuth";
import {useStudents} from "../../hooks/useStudents";
import {useEffect, useState} from "react";
import {SingleStudentRes} from "../../types/student";
import {UserInfoBoxItem} from "../../components/common/UserInfoBox";


export const StudentAccountView = () => {
const {user} = useAuth();
const {getStudentById} = useStudents();
const [studentData, setStudentData] = useState<SingleStudentRes>(null)



useEffect(() => {
    (async () => {
        const response = await getStudentById(user.id)
        setStudentData(response)

    })()
}, [getStudentById])

const {selectedCourses} = studentData || {}

    if (!studentData) {
        return <Spinner/>
    }


    return (
        <Flex color="gray.500" w="100%" h="95vh" mt="2.5vh" flexDir="column" mb="5em">
            <div>

                <Heading mr={30}
                         color="gray.500"
                         m="20px 0 30px"
                         fontWeight="400"
                         fontSize="xx-large"
                         as="h1"> Hello {user.name} {user.last_name} </Heading>
            </div>

            <Box>
                      <Flex flexDirection="column"
                      width={{base: "95%", md: "60%", lg: "45%"}}
                      gap={3}
                      mt={3} >
                    <Text ml={5} color="gray.600">Your email:</Text>
                    <Box  p={3} mb={5} borderRadius="5px"  bg="brand.500" >{user.email}</Box>
                    <Text ml={5} color="gray.600">Your courses:</Text>
                          {selectedCourses.length > 0 && selectedCourses.map(course =>
                     <UserInfoBoxItem key={course.id} children={course.name}/>) }

                </Flex>



            </Box>




        </Flex>
    )
}