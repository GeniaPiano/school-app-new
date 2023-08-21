import {
    Box,
    Divider,
    Flex,
    Heading,
    HStack,
    Icon,
    Modal, ModalBody,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
    SimpleGrid
} from "@chakra-ui/react";
import {useEffect,  useState} from "react";
import {useParams, NavLink, Navigate} from "react-router-dom";
import {StudentsList} from "../../components/Students/StudentsList";
import {useCourses} from "../../hooks/useCourses";
import {CourseEntity} from "../../types/course";
import {AddIcon} from "@chakra-ui/icons";




export const Dashboard = () => {

    const {courseId}: string = useParams();
    const { isOpen, onOpen, onClose } = useDisclosure();


    const [courses, setCourses] = useState <CourseEntity[]| null> (null);
    const [selectedCourse, setSelectedCourse] = useState < string | ''>('')
    const [activeCourseId, setActiveCourseId] = useState<string | null>(null);
    const {getAllCourses} = useCourses()


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
    }, [courseId])



    if (!courseId && courses && courses.length > 0) return (
        <Navigate to={`/course/${courses[0].id}`}/>
    )


    return (
        <Flex
            color="gray.500"
            h="95vh"
            mt="2.5vh"
            flexDir="column"
            >

            <Box as="nav"
                 p="30PX"
                 >
                 <HStack>
                     <Heading
                         my={15}
                         fontSize="x-large"
                         as="h2">courses: </Heading>
                     <Icon as={AddIcon}
                           cursor="pointer"
                           onClick={onOpen}
                     />
                 </HStack>
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent  color="gray.500">
                        <ModalHeader>Add new student to </ModalHeader>
                        <ModalBody> form </ModalBody>
                        <ModalFooter>footer </ModalFooter>
                    </ModalContent>
                </Modal>
            <SimpleGrid spacing={4} columns={{ base: '2', md: '3', lg: '6', xl: '8'}}>
               <> {
                    courses && courses.map((oneCourse) => {
                        return <Flex
                            key={oneCourse.id}
                            alignItems="center"
                            textAlign="center"
                            justifyContent="center"
                            p={{base: "5px 10px", md: "8px", lg: "10px"}}
                            _hover={{color:"white"}}
                            borderRadius="8px"
                            fontWeight={activeCourseId === oneCourse.id ? "600" : "400" }
                            bg={activeCourseId === oneCourse.id ? "brand.800" : "gray.300" }
                            color={activeCourseId === oneCourse.id ? "white" : "gray.500" }

                        >
                            <NavLink
                            to={`/course/${oneCourse.id}`}
                            >
                                {oneCourse.name} </NavLink>
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