import {pool} from "./db";
import {FieldPacket} from "mysql2";


interface MailReq {
    email:string;
}
type RecordResults = [MailReq[], FieldPacket[]];

export const getListOfUsersMails = async()  => {

    const [dataTeachers] = await pool.execute("SELECT  `email` FROM `teachers` ") as RecordResults
    const [dataStudents] = await pool.execute("SELECT `email` FROM `students`") as RecordResults
    const [dataAdmin] = await pool.execute("SELECT `email` FROM `admin`") as RecordResults

    const dataTeachersStudents = [...dataTeachers, ...dataStudents, ...dataAdmin]
    let mails: string[] = [];
    dataTeachersStudents.map(el => {
    mails.push(el.email)
})
return mails;

}

