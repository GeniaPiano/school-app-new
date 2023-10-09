import {pool} from "../utils/db";
import {FieldPacket} from "mysql2";


type AdminRecordResults = [AdminRecord[], FieldPacket[]]


export class AdminRecord {
    readonly id: string;
    email: string;
    password: string;
    readonly role: 'admin';

    constructor(obj: AdminRecord) {

        this.id = obj.id
        this.email = obj.email;
        this.password = obj.password
        this.role = 'admin'
    }


    static async listAll(): Promise <any> {
        const [results] = await pool.execute("SELECT * FROM `admin`") as AdminRecordResults;
        return results.map(obj => new AdminRecord(obj))
    }

    static async getByEmail(email: string) :Promise <AdminRecord> | null {
        const [results] = (await pool.execute("SELECT * FROM `admin` WHERE `email` = :email", {
            email,
        })) as AdminRecordResults;
        return results.length === 0 ? null : new AdminRecord(results[0]);
    }


    static async getOne(id: string): Promise <AdminRecord | null> {
        const [results] = (await pool.execute("SELECT * FROM `admin` WHERE `id` = :id", {
            id,
        })) as AdminRecordResults;
        return results.length === 0 ? null : new AdminRecord(results[0]);
    }

    async updateAdminData(): Promise<void> {
        await pool.execute("UPDATE `admin` SET  `email`= :email, `password` = :password WHERE `id` = :id", {
            id: this.id,
            email: this.email,
            password: this.password,
        });

    }

}

