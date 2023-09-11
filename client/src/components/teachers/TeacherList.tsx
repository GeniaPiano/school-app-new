import {ViewWrapper} from "../common/ViewWrapper";
import {useEffect, useState} from "react";
import {useTeachers} from "../../hooks/useTeachers";
import {TeacherEntity} from "../../types/teacher";
import {List, Spinner} from "@chakra-ui/react";
import {useCounter} from "../../providers/CounterPovider";
import {TeacherListItem} from "./TeacherListItem";

export const TeacherList = () => {
const [teachers, setTeachers] = useState<TeacherEntity[]>(null);
const [loading, setLoading] = useState<boolean>(true)
const {counterTeacher} = useCounter();

const {getAllTeachers} = useTeachers();
    useEffect(() => {
        (async () => {
            try {
                const results = await getAllTeachers();
                setTeachers(results);
                setLoading(false)
            } catch (e) {
                console.log(e)
            } finally {
                setLoading(false)
            }
        })()
    }, [counterTeacher])

    if(loading) return <Spinner/>

     return (
        <ViewWrapper>
            <List>
               <> {loading ? <Spinner/> : (
                   <> {teachers.length !== 0
                       ?  teachers.map(teacher => (
                           <TeacherListItem key={teacher.id} teacher={teacher}/>
                       ))
                       : <span> No teachers. </span>

                   } </>
                )}</>

            </List>
        </ViewWrapper>
    )

}