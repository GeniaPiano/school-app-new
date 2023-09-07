import {pool} from "./db";
import {FieldPacket} from "mysql2";



interface MailReq {
    email:string;
}
type RecordResults = [MailReq[], FieldPacket[]];

const getAllMails = async(): Promise<string[]> => {
    const [dataTeachers] = await pool.execute("SELECT  `email` FROM `teachers` ") as RecordResults
    const [dataStudents] = await pool.execute("SELECT `email` FROM `students`") as RecordResults
    const [dataAdmin] = await pool.execute("SELECT `email` FROM `admin`") as RecordResults

    const dataTeachersStudents = [...dataTeachers, ...dataStudents, ...dataAdmin]
    let mails: string[] = [];
    dataTeachersStudents.map(el => {
        mails.push(el.email)
    })
    return mails
}

export const checkMailAvailable = async(mail:string):Promise<boolean> => {
    const mails = await getAllMails();
    const check = mails.filter(one => one === mail)
    if (check.length !== 0) return false;
    if (check.length === 0) return true;
}

export const checkMailAvailableWhenUpdating = async (prevMail: string, nextMail: string) => {
    const mails = await getAllMails();
    const notAllowedMails =  mails.filter(one => one !== prevMail)
    const check = notAllowedMails.filter(one => one === nextMail)
    if (check.length !== 0) return false;
    if (check.length === 0) return true;
}

