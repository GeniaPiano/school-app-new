
import {Box, Heading, HStack, Icon, IconButton, List, Spinner, useDisclosure} from "@chakra-ui/react";

import {useStudents} from "../../hooks/useStudents";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {SingleStudentRes} from "../../types/student";
import {StudentsListItem} from "./StudentsListItem";
import {ViewWrapper} from "../common/ViewWrapper";
import {FiEdit, FiInfo} from "react-icons/fi";
import {CourseInfo} from "../Course/CourseInfo";



interface Props {
    courseName?: string;
}

export const StudentsList = (props: Props) => {

    const {courseName} = props
    const [students, setStudents] = useState < SingleStudentRes[]> ([])
    const [loading, setLoading] = useState <boolean>(true)
    const {isOpen, onOpen, onClose} = useDisclosure()
    const {courseId} = useParams();
    const {getStudentsByGroup, getAllStudents} = useStudents();

    useEffect(() => {
        (async () => {
            if (courseName === undefined && courseId === undefined) {
                const students = await getAllStudents()
                    setStudents(students);
                    setLoading(false)
            } else {
                const students = await getStudentsByGroup(courseId)
                setStudents(students);
                setLoading(false)
            }
           })();
    }, [courseId])

    if (!students) return <Spinner> Loading... </Spinner>

    return (
        <ViewWrapper>
           <>  {courseName && (
               <> <HStack  mb={3}>
                    <Heading  as="h3"  mr={8} fontSize="x-large" color="brand.800"> {courseName} </Heading>
                    <IconButton variant='solid' color="brand.800" aria-label='course info' icon={<FiInfo/>} onClick={onOpen} />
               </HStack>
               <CourseInfo isOpen={isOpen} onClose={onClose} courseId={courseId} />
             </>

            )}  </>

                <List
            >
                <>  {loading? <Spinner/> : (
                   <Box>
                {students.length !== 0
                    ? students.map((student) => <StudentsListItem
                    key={student.student.id}
                    studentData={student}
                    studentId={student.student.id}
                    />)
                    : <span> No students. </span>}
                    </Box>
                    )} </>
            </List>
        </ViewWrapper>



    )
}