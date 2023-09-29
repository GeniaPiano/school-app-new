import {Box, Flex, Heading, SimpleGrid, Text} from "@chakra-ui/react";
import {useAuth} from "../../hooks/useAuth";
import {useStudents} from "../../hooks/useStudents";
import {useEffect, useState} from "react";
import {SingleStudentRes} from "../../types/student";

export const StudentAccount = () => {
const {user} = useAuth();
const {getStudentById} = useStudents();
const [studentData, setStudentData] = useState<SingleStudentRes>(null)
const {student, selectedCourses} = studentData
useEffect(() => {
    (async () => {
        const response = await getStudentById(user.id)
        setStudentData(response)
    })()
}, [user.id])


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
                <Text>  Your email: {user.email} </Text>
                <Text> Your courses:</Text>
                <SimpleGrid>
                    {selectedCourses && selectedCourses.map(course => <p>{course.name}</p>)}
                </SimpleGrid>


            </Box>




        </Flex>
    )
}