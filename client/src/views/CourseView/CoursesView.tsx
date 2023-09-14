import {
    Box,
    Flex,
    useDisclosure,
    SimpleGrid, Menu, MenuList, Button, MenuButton, MenuItem, MenuGroup,
} from "@chakra-ui/react";
import {useContext, useEffect, useState} from "react";
import {useParams, NavLink, Navigate} from "react-router-dom";
import {StudentsList} from "../../components/students/StudentsList";
import {useCourses} from "../../hooks/useCourses";
import {CourseEntity} from "../../types/course";
import {NavSizeContext} from "../../providers/NavSizeProvider";
import {CourseAddForm} from "../../components/courseForm/CourseAddForm";
import {useCounter} from "../../providers/CounterPovider";
import {firstLetterToUpper} from "../../utils/firstLetterToUpper";
import {Header} from "../../components/Header/Header";
import {ChevronDownIcon} from "@chakra-ui/icons";
import {FormStateProvider} from "../../providers/FormStateProvider";
import {useCourseInfo} from "../../providers/CourseProvider";


export const CoursesView = () => {
    const {navSize} = useContext(NavSizeContext)
    const {courseId}: string = useParams();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [courses, setCourses] = useState <CourseEntity[]| null> (null);
    const [selectedCourse, setSelectedCourse] = useState < string
        >('')
    const [activeCourseId, setActiveCourseId] = useState<string | null>(null);
    const {getAllCourses} = useCourses();
    const {counterCourse} = useCounter();
    const {openModal, openEditModal} = useCourseInfo();


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
    }, [courseId, counterCourse])



    if (!courseId && courses && courses.length > 0) return (
        <Navigate to={`/courses/${courses[0].id}`}/>
    )

    return (
        <FormStateProvider forAdding={true}>
        <Flex color="gray.500" h="95vh" mt="2.5vh" flexDir="column">
            <Box>
                <Flex w="95%" alignItems="center"  gap={50}>
                    <Header title="courses" buttonText='+ add new course' onOpen={onOpen}/>
                </Flex>
                <CourseAddForm isOpen={isOpen} onClose={onClose}/>

            <SimpleGrid spacing={4} columns={[1, 2, 3, 6, 7, 8]}>
               <> {
                    courses && courses.map((oneCourse) => {
                        return(
                           <NavLink to={`/courses/${oneCourse.id}`}>
                               <Flex
                                   key={oneCourse.id}
                                   alignItems="center"
                                   textAlign="center"
                                   justifyContent="space-between"
                                   width={navSize === "large"?  {base: "80%", md: "100%"} : {base: "90%", md: "100%"}}
                                   p={{base: "5px 8px", md: "8px", lg: "10px"}}
                                   borderRadius="8px"
                                   fontWeight={activeCourseId === oneCourse.id ? "600" : "400" }
                                   bg={activeCourseId === oneCourse.id ? "brand.800" : "gray.300" }
                                   color={activeCourseId === oneCourse.id ? "white" : "gray.500" }

                               >
                                <Box   _hover={{color:"white"}}>
                                    {firstLetterToUpper(oneCourse.name)}
                                </Box>



                                   <Menu _hover={{color:"white"}} >
                                       <MenuButton >
                                           <ChevronDownIcon size="l" />
                                       </MenuButton>
                                       <MenuList>
                                           <MenuGroup >
                                               <MenuItem color="teal" onClick={()=> {openModal(oneCourse.id)}}>info</MenuItem>
                                               <MenuItem color="teal" onClick={()=> {openEditModal(oneCourse.id)}} >edit</MenuItem>
                                               <MenuItem color="teal">delete </MenuItem>
                                           </MenuGroup>
                                       </MenuList>
                                   </Menu>

                               </Flex>
                           </NavLink>)})
                               } </>

            </SimpleGrid>
            </Box>

            <StudentsList courseName={selectedCourse} mainList={false}/>


        </Flex>
        </FormStateProvider>
    )
}