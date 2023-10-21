import {
    Box,
    Flex,
    useDisclosure,
    TableContainer,
    Table,
    TableCaption,
} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {useCourses} from "../../../hooks/useCourses";
import {CourseAddForm} from "../../../components/courseForm/CourseAddForm";
import {useCounter} from "../../../providers/CounterPovider";
import {Header} from "../../../components/Header/Header";
import {FormStateProvider} from "../../../providers/FormStateProvider";
import {PaginatedCoursesListForAdmin} from "../../../components/PaginatedCoursesListForAmin/PaginatedCoursesListForAdmin";
import {CourseAllDetails} from "../../../types/course";
import {CourseInfo} from "../../../components/CourseInfo/CourseInfo";


export const CoursesView = () => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [courses, setCourses] = useState <CourseAllDetails[]> ([]);
    const {getCoursesAllDetails} = useCourses();
    const {counterCourse} = useCounter();



    useEffect(() => {
        (async () => {
          try {
              const coursesList = await getCoursesAllDetails();
              setCourses(coursesList)
          } catch (e) {
              console.log(e)
          }
        })()
    }, [counterCourse, getCoursesAllDetails])

    return (
        <FormStateProvider forAdding={true}>
        <Box
            color="gray.500" h="95vh" mt="2.5vh" flexDir="column" width="90%"
        >
            <Box>
                <Flex w="95%" alignItems={{base: "center", md: "space-between"}}  gap={50}>
                    <Header title="courses" buttonText='+ add new course' onOpen={onOpen}/>
                </Flex>
                <CourseAddForm isOpen={isOpen} onClose={onClose}/>

                <TableContainer border='1px solid'
                                borderColor="gray.300"
                                borderRadius='md'
                                overflowX="auto"
                                whiteSpace="wrap"
                >
                    <Table>
                        {courses.length > 0 ? (
                            <PaginatedCoursesListForAdmin data={courses} itemsPerPage={6} />
                        ) : (
                            <TableCaption>No courses available</TableCaption>
                        )}
                    </Table>
                </TableContainer>
               <> {
                    courses && courses.map((oneCourse) => {
                        return(
                           <p key={oneCourse.id} >

                           </p>)})
                               } </>

            </Box>

        </Box>
        <CourseInfo />
        </FormStateProvider>
    )
}