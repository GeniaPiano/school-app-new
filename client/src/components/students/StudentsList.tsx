

import {Heading, HStack, IconButton, List, Spinner, useDisclosure} from "@chakra-ui/react";

import {useStudents} from "../../hooks/useStudents";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {SingleStudentRes} from "../../types/student";
import {StudentsListItem} from "./StudentsListItem";
import {ViewWrapper} from "../common/ViewWrapper";
import {FiEdit, FiInfo, FiTrash2} from "react-icons/fi";
import {CourseInfo} from "../CourseInfo/CourseInfo";
import {useCounter} from "../../providers/CounterPovider";
import {FormStateProvider} from "../../providers/FormStateProvider";
import {PostingDataProvider} from "../../providers/PostingDataProvider";
import {useCourseInfo} from "../../providers/CourseProvider";


interface Props {
    courseName?: string;
    mainList:boolean;
}

export const StudentsList = ({courseName, mainList}: Props) => {

    const [students, setStudents] = useState < SingleStudentRes[]> ([])
    const [loading, setLoading] = useState <boolean>(true)
    const {openModal} = useCourseInfo();
    const {courseId} = useParams();
    const {getStudentsByGroup, getAllStudents} = useStudents();
    const {counterStudent}= useCounter()

    useEffect(() => {
        (async () => {
            if (courseName === undefined && courseId === undefined)  {
                const students = await getAllStudents()
                    setStudents(students);
                    setLoading(false)
            } else {
                const students = await getStudentsByGroup(courseId)
                setStudents(students);
                setLoading(false)
            }
           })();
    }, [courseId, counterStudent])


    return (
        <ViewWrapper>
           <>  {courseName && (
               <> <HStack >
                    <Heading  as="h3"  mr={8} fontSize="x-large" color="brand.800"> {courseName} </Heading>
                    <IconButton variant='solid' color="brand.800" aria-label='course info' icon={<FiInfo/>} onClick={()=> openModal(courseId)} />
                    {/*<IconButton variant='solid' color="brand.800" aria-label='course edit' icon={<FiEdit/>} onClick={onOpen} />*/}
                    {/*<IconButton variant='solid' color="brand.800" aria-label='course delete' icon={<FiTrash2/>} onClick={onOpen} />*/}
               </HStack>
               <CourseInfo />
             </>

            )} </>

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
                                        courseName={courseName}
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