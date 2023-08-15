import axios from "axios";
import {Flex, ListItem, Button, Text, useDisclosure, SimpleGrid, Heading, Box, GridItem} from "@chakra-ui/react";
import {Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
} from '@chakra-ui/react'
import {ChangeEvent, ReactNode, useEffect, useState} from "react";
import {CleanedStudent, DataCoursesResForSingleStudent} from "../../types/student";
import {FormEditStudent} from "../StudentForm/FormEditStudent";
import {initialState} from "../StudentForm/initialState";
import {STUDENT_URL} from "../../utils/url";
import {CourseEntity} from "../../types/course";
import {useCourses} from "../../hooks/useCourses";



interface Props {
    studentData: {
        student: CleanedStudent,
        selectedCourses: DataCoursesResForSingleStudent[],
    }
}

export const StudentsListItem = (props: Props): ReactNode  => {
    const {getAllCourses} = useCourses();
    const {student, selectedCourses} = props.studentData
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isEditing, setIsEditing] = useState(false);
    const [availableCourses, setAvailableCourses] = useState < CourseEntity[] | null> (null);
    const [coursesReadyToUpdate, setCoursesReadyToUpdate] = useState<CourseEntity[]>(selectedCourses);

    const handleRemoveCourse = (courseId) => {
        setCoursesReadyToUpdate(prevSelectedCourses => prevSelectedCourses.filter(course => course.id !== courseId));
    };


    const [inputValues, setInputValues] = useState (initialState(student));
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const {name, value} = e.target;
        setInputValues((prevVal: CleanedStudent) => ({
            ...prevVal,
            [name]: value
        }));
    }

    useEffect(() => {
        (async () => {
            const courses = await getAllCourses();
            if (courses) {
                const filteredCourses = courses.filter(course => !coursesReadyToUpdate.some(selectedCourse => selectedCourse.id === course.id));
                setAvailableCourses(filteredCourses);
            }
        })();
    }, [coursesReadyToUpdate]);


    const handleSelectChange = (e) => {
        const courseId = e.target.value;
        if (availableCourses) {
            const courseToAdd = availableCourses.find(course => course.id === courseId)
            setCoursesReadyToUpdate(prevState => [...prevState, courseToAdd])
            setAvailableCourses(prev => prev.filter(course => course.id !== courseId))
        }
    }

    const handleSubmit = async(e) => {
        setIsEditing(prev => !prev)
        if (isEditing) {
            console.log('submit')
             e.preventDefault();
            console.log('inputValues:', inputValues)
            console.log('selectedCourses',coursesReadyToUpdate.map(course => course.id) )
                try {
                    const res = await axios.patch(`${STUDENT_URL}/${student.id}/update`, {
                        student: inputValues,
                        selectedCourses:coursesReadyToUpdate.map(course => course.id),
                    })

                    console.log('Res from server', res.data);

                } catch (err) {
                    console.log(err.response.data)}
        }
    }

   const cancelEditing = () => {
        setIsEditing(false);
       setCoursesReadyToUpdate(selectedCourses);


   }


    return (
        <ListItem>
            <Flex justifyContent="space-between"
                  _hover={{color: "brand.700"}}
                  cursor="pointer"
                  my={2}
                  onClick={onOpen}>
                <Text>{student.name} {student.last_name}</Text>
            </Flex>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent color="gray.500">
                    <Box> {isEditing
                        ? <> <ModalHeader>Edit data</ModalHeader>
                            <ModalBody>
                                <FormEditStudent
                                    studentData={props.studentData}
                                    handleSubmit={handleSubmit}
                                    handleInputChange={handleInputChange}
                                    handleRemoveCourse={handleRemoveCourse}
                                    coursesReadyToUpdate={coursesReadyToUpdate}
                                    inputValues={inputValues}
                                    handleSelectChange={handleSelectChange}
                                    availableCourses={availableCourses}/>
                            </ModalBody> </>

                        : <>  <ModalHeader>{student.name} {student.last_name}</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <Flex flexDir="column"
                                      my={4}>
                                    <Heading as="h3" size="sm" fontWeight="500" mb={5}>courses:</Heading>
                                    <SimpleGrid  columns={3}
                                                 spacing={4}
                                                 color="gray.500" >
                                        <>{selectedCourses.map(course =>
                                            <GridItem
                                                key={course.id}
                                                bg="brand.800"
                                                border="solid 1px"
                                                borderRadius="8px"
                                                color="white"
                                            >
                                                <Flex
                                                    p={2}
                                                    justifyContent="center"
                                                    alignItems="center"
                                                    borderRadius="8px"
                                                    textAlign="center"
                                                >
                                                    {course.name}</Flex>
                                            </GridItem> )} </>
                                    </SimpleGrid>
                                </Flex>
                                <Box mt="40px">
                                    <Heading as="h3" size="sm" fontWeight="500" >email:</Heading>
                                    <p>{student.email}</p>
                                </Box>
                            </ModalBody> </> }
                    </Box>

                    <ModalFooter>
                        <Button colorScheme='gray' color="gray.500" mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button type={isEditing ? "submit" : "button"}
                                color="gray.500"
                                colorScheme='gray'
                                mr={3}
                                onClick={handleSubmit}>{isEditing ? 'Save' : 'Edit'}</Button>
                        <> {isEditing && (
                            <Button  color="gray.500" mr={3}
                                     colorScheme='gray'
                                     onClick={cancelEditing}
                            >Cancel</Button>
                        )} </>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </ListItem>
    )
}