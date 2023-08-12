import {Box, Divider, Flex, Heading} from "@chakra-ui/react";
import {useEffect, useRef, useState} from "react";
import axios from 'axios';
import {useParams, Link, Navigate} from "react-router-dom";
import {COURSE_URL} from "../../utils/url";
import {StudentsList} from "../../components/Students/StudentsList";

interface CourseData {
    id: string,
    name: string,
    teacher_id: string | null
}


interface CourseResponse {
    coursesList: CourseData[];
}

export const Dashboard = () => {

    const {courseId} = useParams();

    const [courses, setCourses] = useState <CourseData[]| null> (null);
    const [selectedCourse, setSelectedCourse] = useState < string | null>(null)

    useEffect(() => {
        axios.get<CourseResponse>(`${COURSE_URL}`)
            .then(({data}) => {
                setCourses(data.coursesList);

                if (!courseId &&  data.coursesList.length > 0) {
                    setSelectedCourse(data.coursesList[0].name)


                } else {
                    const selectedCourse = data.coursesList.filter(course => course.id === courseId);
                    if (selectedCourse) {
                        setSelectedCourse(selectedCourse[0].name);
                    }

                }
                   }
                )
            .catch((err) => console.log(err))
    }, [courseId])



    // if (!id && courses && courses.length > 0) return (
    //     <Navigate to={`/course/${courses[0].id}`}/>
    // )

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
                <Heading
                    my={15}
                    fontSize="x-large"
                    as="h2">courses: </Heading>

                {
                    courses && courses.map((oneCourse) => {
                        return <Link key={oneCourse.id} to={`/course/${oneCourse.id}`}> {oneCourse.name} </Link>
                })
                }
            </Box>
            <Divider
                border="3px gray.500 solid"
                mx={0}/>
            <StudentsList courseName={selectedCourse}/>


        </Flex>
    )
}