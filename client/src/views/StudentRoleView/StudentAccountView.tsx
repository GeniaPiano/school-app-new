import { Flex, Heading, Spinner, HStack, Button, List, ListItem, ListIcon, Text} from "@chakra-ui/react";
import {useAuth} from "../../hooks/useAuth";
import {useStudents} from "../../hooks/useStudents";
import {useEffect, useState} from "react";
import {SingleStudentRes} from "../../types/student";
import {useCoursesForOneStudent} from "../../hooks/useCoursesForOneStudent";
import {TimeIcon} from "@chakra-ui/icons";


export const StudentAccountView = () => {
const {user} = useAuth();
const {courses} = useCoursesForOneStudent(user?.id);
const {getStudentById} = useStudents();
const {coursesChosen} = courses;
const [studentData, setStudentData] = useState<SingleStudentRes>(null)

useEffect(() => {
    (async () => {
        const response = await getStudentById(user.id)
        setStudentData(response)

    })()
}, [getStudentById])

    if (!studentData) {
        return <Spinner/>
    }

    return (
        <Flex
            color="gray.500"
            w="100%"
            h="95vh"
            mt="2.5vh"
            flexDir="column"
            alignItems={{base: "flex-start", md: "center"}}
            mb="5em"
        >
            <HStack>

                <Heading mr={30}
                         color="gray.500"
                         m="20px 0 30px"
                         fontWeight="400"
                         fontSize="xx-large"
                         as="h1"> Hello {user.name} {user.last_name} </Heading>
                <Button color="gray.600">Edit your data</Button>
            </HStack>

            <Text>Active courses:</Text>
            <List spacing={3}>
                {coursesChosen.length > 0 && coursesChosen.map(course => (
                    <ListItem key={course.id}>
                        <ListIcon as={TimeIcon} color='brand.600' />
                        {course.name}
                    </ListItem>
                ))}
            </List>





        </Flex>
    )
}