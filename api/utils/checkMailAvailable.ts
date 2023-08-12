import {pool} from "./db";
import {FieldPacket} from "mysql2";


interface MailReq {
    email:string;
}
type RecordResults = [MailReq[], FieldPacket[]];

export const checkMailAvaible = async (mail:string):Promise<boolean> => {

    const [dataTeachers] = await pool.execute("SELECT  `email` FROM `teachers` ") as RecordResults
    const [dataStudents] = await pool.execute("SELECT `email` FROM `Students`") as RecordResults
    const [dataAdmin] = await pool.execute("SELECT `email` FROM `admin`") as RecordResults

    const dataTeachersStudents = [...dataTeachers, ...dataStudents, ...dataAdmin]
    let mails: string[] = [];
    dataTeachersStudents.map(el => {
    mails.push(el.email)
       })

    const check = mails.filter(one => one === mail)
    if (check.length !== 0) return false;
    if (check.length === 0) return true;


}

