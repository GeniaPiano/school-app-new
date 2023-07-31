import {pool} from "../utils/db";
import {ValidationError} from "../utils/errors";
import {v4 as uuid} from "uuid";
import {FieldPacket} from "mysql2";
import {MessageEntity} from "../types";

type MessageRecordResults = [MessageRecord[], FieldPacket[]]

export class MessageRecord implements MessageEntity {
    id?: string;
    author_id: string;
    author_name: string;
    headline: string;
    content: string;
    readonly createdAt: Date;

    constructor(obj: MessageRecord) {

        if (!obj.headline || obj.headline.length < 4 || obj.headline.length > 40) {
            throw new ValidationError('Headline should contain from 4 to 40 characters');
        }
        if (!obj.content || obj.content.length < 30 || obj.content.length >= 500) {
            throw new ValidationError('Content should contain from 30 to 500 characters');
        }

        this.id = obj.id;
        this.author_id = obj.author_id;
        this.author_name = obj.author_name;
        this.headline = obj.headline;
        this.content = obj.content;
        this.createdAt = new Date();
    }

    async insert(author_id: string, author_name: string) {
        if (!this.id) {
            this.id = uuid();
        }

        pool.execute("INSERT INTO `messages`(`id`, `author_id`, `author_name`, `headline`, `content`,  `createdAt`) VALUES(:id, :author_id, :author_name, :headline, :content, :createdAt)",{
            id: this.id
        })
    }



}


