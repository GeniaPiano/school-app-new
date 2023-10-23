import {
    Box,
    Flex,
    Heading,
} from "@chakra-ui/react";


import {CoursesStore} from "../../components/StudentRole/CoursesStore";
import {useCourses} from "../../hooks/useCourses";
import {useEffect, useState} from "react";
import {CourseAllDetails} from "../../types/course";

export const StudentCoursesView = () => {
    const [courses, setCourses] = useState< CourseAllDetails[]>([]);
    const {getCoursesAllDetails} =  useCourses();


    useEffect(()=>{
        (async () => {
            const result = await getCoursesAllDetails() as  CourseAllDetails[]
            setCourses(result);
        })()
    },[getCoursesAllDetails])

    return (
        <Flex color="gray.500" h="95vh" width="90%" flexDir="column" mb="5em" mr="4.5em">
            <Box>
                <Heading
                         color="gray.500"
                         m="10px 0 10px 5px"
                        fontWeight="400"
                         fontSize="xx-large"
                         as="h1"> Courses
                </Heading>
                <CoursesStore coursesAvailable={courses}/>
            </Box>
        </Flex>
    )
}