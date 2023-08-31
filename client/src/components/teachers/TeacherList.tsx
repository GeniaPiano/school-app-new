import {ViewWrapper} from "../common/ViewWrapper";
import {useEffect, useState} from "react";
import {useTeachers} from "../../hooks/useTeachers";
import {TeacherEntity} from "../../types/teacher";
import {Spinner} from "@chakra-ui/react";
import {UserItem} from "../common/UserItem";

export const TeacherList = () => {
const [teachers, setTeachers] = useState<TeacherEntity[]>(null);
const [loading, setLoading] = useState<boolean>(false)

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
    })


    if(!teachers) return <Spinner/>
    const list = teachers.map(oneTeacher => (
        <UserItem key={oneTeacher.id} >
            {oneTeacher.name} {oneTeacher.last_name}
        </UserItem>
    ))



    return (
        <ViewWrapper>
            {list}
        </ViewWrapper>
    )

}