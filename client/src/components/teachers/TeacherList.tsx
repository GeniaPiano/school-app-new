import {ViewWrapper} from "../common/ViewWrapper";
import {useEffect, useState} from "react";
import {useTeachers} from "../../hooks/useTeachers";
import {TeacherEntity} from "../../types/teacher";
import {List, Spinner, Text} from "@chakra-ui/react";
import {useCounter} from "../../providers/CounterPovider";
import {TeacherListItem} from "./TeacherListItem";
import {useSearch} from "../../providers/SearchProvider";

export const TeacherList = () => {
const [teachers, setTeachers] = useState<TeacherEntity[]>(null);
const [loading, setLoading] = useState<boolean>(true)
const {counterTeacher} = useCounter();
const {searchTeacher, titleTeachers} = useSearch()


const {getAllTeachers} = useTeachers();
    useEffect(() => {
        (async () => {
            try {
                const results = await getAllTeachers(searchTeacher);
                setTeachers(results);
                setLoading(false)
            } catch (e) {
                console.log(e)
            } finally {
                setLoading(false)
            }
        })()
    }, [counterTeacher, searchTeacher])

    if(loading) return <Spinner/>

     return (
        <ViewWrapper>
            <Text fontWeight="700" color="brand.800">{titleTeachers}</Text>
            <List>
               <> {loading ? <Spinner/> : (
                   <> {teachers.length !== 0
                       ?  teachers.map(teacher => (
                           <TeacherListItem key={teacher.id} teacher={teacher}/>
                       ))
                       : <Text my={10}> No teachers. </Text>

                   } </>
                )}</>

            </List>
           </ViewWrapper>
    )

}