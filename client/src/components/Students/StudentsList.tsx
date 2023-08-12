
import {Box, Flex, Heading, List, ListItem, Spinner} from "@chakra-ui/react";
import {useStudents} from "../../hooks/useStudents";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {StudentEntity} from "../../types/student";
import {StudentsListItem} from "./StudentsListItem";


interface Props {
    courseName: string;
}

export const StudentsList = ({ courseName }: Props) => {

    const [students, setStudents] = useState(null)

    const {courseId} = useParams();
    const {getStudentsByGroup, getStudentById} = useStudents();

    useEffect(() => {
        (async () => {
            const students = await getStudentsByGroup(courseId)
            setStudents(students)
            console.log(students)
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
         >
            <Heading
                as="h3"
                fontSize="x-large"
                color="#AEC8CA"
                mb={5}

            > {courseName} </Heading>

            <List
            >

                {students.length !== 0
                    ? students.map((student, id) => <StudentsListItem key={id} student={student}/>)
                    : <span> No students at this course. </span>}

            </List>

        </Box>



    )
}