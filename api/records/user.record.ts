import { UserEntityLoginData} from "../types";
import {ValidationError} from "../utils/errors";
import {v4 as uuid} from "uuid";
import {pool} from "../utils/db";

export class UserRecord implements UserEntityLoginData {
    id?: string;
    email: string;
    password: string;

    constructor(obj: UserRecord) {
        if (!obj.email || obj.email.length <= 4 || obj.email.length < 40) {
            throw new ValidationError('Missing data or data incorrect.');
        }

        this.id = obj.id;
        this.email = obj.email;
        this.password = obj.password;
    }

    async insert(): Promise<string> {
        if (!this.id) {
            this.id = uuid();
        }

        await pool.execute("INSERT INTO `users`(`id`, `email`, `password`) VALUES(:id, :email, :password)", {
            id: this.id,
            email: this.email,
            password: this.password,
        });

        return this.id;
    }


}