
import {Box, Flex, Heading, List, ListItem, Spinner} from "@chakra-ui/react";
import {useStudents} from "../../hooks/useStudents";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {SingleStudentRes, StudentEntity} from "../../types/student";
import {StudentsListItem} from "./StudentsListItem";

interface Props {
    courseName: string;
}

export const StudentsList = ({ courseName }: Props) => {
    const [students, setStudents] = useState < SingleStudentRes[]> ([])

    const {courseId} = useParams();
    const {getStudentsByGroup} = useStudents();

    useEffect(() => {
        (async () => {
            const students = await getStudentsByGroup(courseId)
            setStudents(students)
            console.log('students',students)
        })();
    }, [courseId])

    if (!students) return <Spinner> Loading... </Spinner>

    return (

        <Box
            color="gray.500"
            boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.09)"
            borderRadius='15px'
            mt={10}
            flexDirection="column"
            p={5}
            mr={4}
         >
            <Heading
                as="h3"
                fontSize="x-large"
                color="brand.800"
                mb={5}

            > {courseName} </Heading>

            <List
            >
            <Box>
                {students.length !== 0
                    ? students.map((student, id) => <StudentsListItem key={id} studentData={student}/>)
                    : <span> No students at this course. </span>}

            </Box>
            </List>

        </Box>



    )
}