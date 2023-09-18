

import {Heading, HStack, IconButton, List, Spinner, Text} from "@chakra-ui/react";

import {useStudents} from "../../hooks/useStudents";
import {useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {SingleStudentRes} from "../../types/student";
import {StudentsListItem} from "./StudentsListItem";
import {ViewWrapper} from "../common/ViewWrapper";
import {FiEdit, FiInfo, FiTrash2} from "react-icons/fi";
import {CourseInfo} from "../CourseInfo/CourseInfo";
import {useCounter} from "../../providers/CounterPovider";
import {FormStateProvider} from "../../providers/FormStateProvider";
import {useCourseInfo} from "../../providers/CourseProvider";
import {NavSizeContext} from "../../providers/NavSizeProvider";
import {IoPersonAddOutline} from "react-icons/io5";
import {useSearch} from "../../providers/SearchProvider";



interface Props {
    courseName?: string;
    mainList:boolean;
}

export const StudentsList = ({courseName, mainList}: Props) => {
    const {searchStudent} = useSearch()

    const [students, setStudents] = useState < SingleStudentRes[]> ([])
    const [loading, setLoading] = useState <boolean>(true)
    const {openModal, openEditModal, openDeleteModal} = useCourseInfo();
    const {courseId} = useParams();
    const {getStudentsByGroup, getAllStudents} = useStudents();
    const {counterStudent, counterCourse}= useCounter()
    const {navSize} = useContext(NavSizeContext)

    useEffect(() => {
        (async () => {
            if (courseName === undefined && courseId === undefined)  {
                const students = await getAllStudents(searchStudent)
                setStudents(students);
                setLoading(false)
            } else {
                const students = await getStudentsByGroup(courseId)
                setStudents(students);
                setLoading(false)
            }
        })();
    }, [courseId, counterStudent, counterCourse, searchStudent])


    return (
        <ViewWrapper>
            <>  {courseName && (
                <> <HStack mb={50} >
                    <Heading  as="h3"
                              mr={navSize === 'small'  ? 6 : 5}
                              fontSize="x-large"
                              color="brand.800"> {courseName.toUpperCase()} </Heading>
                    <IconButton variant='solid' color="brand.800" aria-label='course info' icon={<FiInfo/>} onClick={()=> openModal(courseId)} />
                    <IconButton variant='solid' color="brand.800" aria-label='course edit' icon={<FiEdit/>} onClick={()=> openEditModal(courseId)}/>
                    <IconButton variant='solid' color="brand.800" aria-label='add student' icon={<IoPersonAddOutline/>}  />
                    <IconButton variant='solid' color="brand.800" aria-label='course delete' icon={<FiTrash2/>} onClick={()=> openDeleteModal(courseId)} />
                </HStack>
                    <CourseInfo />
                </>

            )} </>
            <Text fontWeight="700" color="brand.800">students:</Text>
            <List>
                <FormStateProvider forAdding={false}>
                    <>  {loading? <Spinner/> : (
                        <> {students.length !== 0
                            ? students.map((student) =>
                                <StudentsListItem
                                    key={student.student.id}
                                    studentData={student}
                                    studentId={student.student.id}
                                    mainList={mainList}
                                    courseName={courseName? courseName : ''}
                                />
                            )
                            : <span> No students. </span>}
                        </>
                    )} </>
                </FormStateProvider>
            </List>

        </ViewWrapper>



    )
}