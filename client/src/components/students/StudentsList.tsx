

import {Heading, HStack, IconButton, List, Spinner, useDisclosure} from "@chakra-ui/react";

import {useStudents} from "../../hooks/useStudents";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {SingleStudentRes} from "../../types/student";
import {StudentsListItem} from "./StudentsListItem";
import {ViewWrapper} from "../common/ViewWrapper";
import {FiInfo} from "react-icons/fi";
import {CourseInfo} from "../CourseInfo/CourseInfo";
import {useCounter} from "../../provider/CounterPovider";
import {FormStateProvider} from "../../provider/FormStateProvider";


interface Props {
    courseName?: string;
    mainList:boolean;
}

export const StudentsList = ({courseName, mainList}: Props) => {

    const [students, setStudents] = useState < SingleStudentRes[]> ([])
    const [loading, setLoading] = useState <boolean>(true)
    const {isOpen, onOpen, onClose} = useDisclosure()
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
                    <IconButton variant='solid' color="brand.800" aria-label='course info' icon={<FiInfo/>} onClick={onOpen} />
               </HStack>
               <CourseInfo isOpen={isOpen} onOpen={onOpen} onClose={onClose} courseId={courseId} />
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
                                mainList={mainList} />
                              )
                            : <span> No students. </span>}
                         </>
                        )} </>
                 </FormStateProvider>
                 </List>

        </ViewWrapper>



    )
}