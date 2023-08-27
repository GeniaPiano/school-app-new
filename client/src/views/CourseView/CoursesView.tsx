import {
    Box,
    Divider,
    Flex,
    useDisclosure,
    SimpleGrid, HStack, Button,
} from "@chakra-ui/react";
import {useContext, useEffect, useState} from "react";
import {useParams, NavLink, Navigate} from "react-router-dom";
import {StudentsList} from "../../components/Students/StudentsList";
import {useCourses} from "../../hooks/useCourses";
import {CourseEntity} from "../../types/course";
import {Header} from "../../layouts/Header";
import {NavSizeContext} from "../../provider/NavSizeProvider";
import {CourseAddForm} from "../../components/CourseForm/CourseAddForm";
import {useCounter} from "../../provider/CounterPovider";
import {firstLetterToUpper} from "../../utils/firstLetterToUpper";
import {AddButton} from "../../components/common/addButton";




export const CoursesView = () => {
    const {navSize} = useContext(NavSizeContext)
    const {courseId}: string = useParams();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [courses, setCourses] = useState <CourseEntity[]| null> (null);
    const [selectedCourse, setSelectedCourse] = useState < string | ''>('')
    const [activeCourseId, setActiveCourseId] = useState<string | null>(null);
    const {getAllCourses} = useCourses();
    const {counter} = useCounter();


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
    }, [courseId, counter])



    if (!courseId && courses && courses.length > 0) return (
        <Navigate to={`/courses/${courses[0].id}`}/>
    )

    return (
        <Flex color="gray.500" h="95vh" mt="2.5vh" flexDir="column">
            <Box as="nav" p="30px">
                <Flex w="95%" alignItems="center"  gap={50}>
                    <Header title="courses" mr={30}/>
                    <AddButton  text = '+ add course' onOpen={onOpen}/>
                </Flex>

                <CourseAddForm isOpen={isOpen} onClose={onClose}/>

            <SimpleGrid spacing={4} columns={[1, 2, 3, 6, 7, 8]}>
               <> {
                    courses && courses.map((oneCourse) => {
                        return <Flex
                            key={oneCourse.id}
                            alignItems="center"
                            textAlign="center"
                            justifyContent="center"
                            width={navSize === "large"?  {base: "65%", md: "100%"} : {base: "90%", md: "100%"}}
                             p={{base: "5px 8px", md: "8px", lg: "10px"}}
                            _hover={{color:"white"}}
                            borderRadius="8px"
                            fontWeight={activeCourseId === oneCourse.id ? "600" : "400" }
                            bg={activeCourseId === oneCourse.id ? "brand.800" : "gray.300" }
                            color={activeCourseId === oneCourse.id ? "white" : "gray.500" }

                        >
                            <NavLink
                            to={`/courses/${oneCourse.id}`}
                            >
                                {firstLetterToUpper(oneCourse.name)} </NavLink>
                        </Flex>
                    })
                } </>
            </SimpleGrid>
            </Box>
            <Divider
                border="3px gray.500 solid"
                mx={0}/>
            <StudentsList courseName={selectedCourse}/>


        </Flex>
    )
}