import {
    Box,
    Flex,
    useDisclosure,
    TableContainer,
    Table,
    TableCaption,
} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {useParams, Navigate} from "react-router-dom";
import {useCourses} from "../../../hooks/useCourses";
import {CourseEntity} from "../../../types/course";
import {CourseAddForm} from "../../../components/courseForm/CourseAddForm";
import {useCounter} from "../../../providers/CounterPovider";
import {Header} from "../../../components/Header/Header";
import {FormStateProvider} from "../../../providers/FormStateProvider";
import {PaginatedCoursesListForAdmin} from "../../../components/PaginatedCoursesListForAmin/PaginatedCoursesListForAdmin";


export const CoursesView = () => {
    const {courseId}: string = useParams();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [courses, setCourses] = useState <CourseEntity[]> ([]);
    const [selectedCourse, setSelectedCourse] = useState <string>('')
    const [activeCourseId, setActiveCourseId] = useState<string | null>(null);
    const {getAllCourses} = useCourses();
    const {counterCourse} = useCounter();



    useEffect(() => {
        (async () => {
          try {
              const coursesList = await getAllCourses();
              setCourses(coursesList)
              if (!courseId &&  coursesList.length > 0) {
                                  setSelectedCourse(coursesList[0].name)
                              } else {
                                  const selectedCourseObj = coursesList.find(course => course.id === courseId);
                                  if (selectedCourseObj) {
                                      setSelectedCourse(selectedCourseObj.name);
                                      setActiveCourseId(selectedCourseObj.id)
                                  }}
          } catch (e) {
              console.log(e)
          }
        })()
    }, [courseId, counterCourse, getAllCourses])


    if (!courseId && courses && courses.length > 0) return (
        <Navigate to={`/courses/${courses[0].id}`}/>
    )

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
                        {courses.length > 0 ? ( // Sprawdzenie, czy courses nie jest puste
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
        </FormStateProvider>
    )
}