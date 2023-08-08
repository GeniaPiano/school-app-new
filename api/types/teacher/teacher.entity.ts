export interface TeacherEntity {
    id?: string;
    name: string;
    last_name: string;
    email: string;
    password?: string;
    role: 'teacher';
}

