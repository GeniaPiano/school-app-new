import {Button, Box,Heading, HStack, IconButton, List, Spinner, Flex, Text} from "@chakra-ui/react";
import {useStudents} from "../../hooks/useStudents";
import {useContext, useEffect, useState} from "react";
import {SingleStudentRes} from "../../types/student";
import {FiEdit, FiInfo, FiTrash2} from "react-icons/fi";
import {CourseInfo} from "../CourseInfo/CourseInfo";
import {useCounter} from "../../providers/CounterPovider";
import {FormStateProvider} from "../../providers/FormStateProvider";
import {useCourseInfo} from "../../providers/CourseProvider";
import {NavSizeContext} from "../../providers/NavSizeProvider";
import {useSearch} from "../../providers/SearchProvider";
import {PaginatedStudentList} from "../PaginatedStudentList/PaginatedStudentList";
import {useCourses} from "../../hooks/useCourses";
import {useNavigate} from 'react-router-dom';


interface Props {
    courseName?: string;
    mainList:boolean;
    courseId: string;
    small?: false;
}

export const StudentsList = ({mainList, courseId}: Props) => {
    const {searchStudent} = useSearch()

    const [students, setStudents] = useState < SingleStudentRes[]> ([]);
    const [courseName, setCourseName] = useState<string>('');
    const [loading, setLoading] = useState <boolean>(true);
    const {openModal, openEditModal, openDeleteModal} = useCourseInfo();
    const {getOneAllDetails} = useCourses();
    const {getStudentsByGroup, getAllStudents} = useStudents();
    const {counterStudent, counterCourse}= useCounter();
    const {navSize} = useContext(NavSizeContext);
    const {titleStudents} = useSearch();
    const navigate = useNavigate();


    useEffect(() => {
        (async () => {
            if (courseId === undefined)  {
                const students = await getAllStudents(searchStudent)
                setStudents(students);
                setLoading(false)
            } else {
                const students = await getStudentsByGroup(courseId)
                const course = await getOneAllDetails(courseId);
                setCourseName(course.name)
                setStudents(students);
                setLoading(false)
            }
        })();
    }, [courseId, counterStudent, counterCourse, searchStudent])

    return (
        <Box   color="gray.500" h="95vh" mt="2.5vh" flexDir="column" width="90%" >
        <Flex flexDirection="column">
            <>
                {!mainList && <Button onClick={()=> navigate('/courses')} my={5} >Back to Courses Data</Button>}
                {courseName && (
                <> <HStack mb={50} >
                    <Heading  as="h3"
                              mr={navSize === 'small'  ? 6 : 5}
                              fontSize="x-large"
                              color="brand.800"> {courseName.toUpperCase()} </Heading>
                    <IconButton variant='solid' color="brand.800" aria-label='course info' icon={<FiInfo/>} onClick={()=> openModal(courseId)} />
                    <IconButton variant='solid' color="brand.800" aria-label='course edit' icon={<FiEdit/>} onClick={()=> openEditModal(courseId)}/>
                    <IconButton variant='solid' color="brand.800" aria-label='course delete' icon={<FiTrash2/>} onClick={()=> openDeleteModal(courseId)} />
                </HStack>
                    <CourseInfo />
                </>

            )} </>
            {mainList && <Text fontWeight="700" color="brand.800" m={5}>{titleStudents}</Text>}
            <List>
                <FormStateProvider forAdding={false}>
                    <>  {loading? <Spinner/> : (
                        <>
                            {
                                students.length !== 0
                                ? <PaginatedStudentList
                                        data={students}
                                        itemsPerPage={5}
                                        mainList={mainList}
                                        courseName={courseName}
                                        user='student'/> : <Text my={10}> No students. </Text>
                            }
                        </>
                    )} </>
                </FormStateProvider>
            </List>

        </Flex>
        </Box>


    )
}