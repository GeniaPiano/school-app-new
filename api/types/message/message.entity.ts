export interface MessageEntity {
    id?:string;
    author_id: string;
    author_name: string;
    headline: string;
    content: string;
    createdAt: Date;

}