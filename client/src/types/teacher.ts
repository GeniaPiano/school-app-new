export interface TeacherEntity {
    id: string;
    name: string;
    last_name: string;
    email: string;
    password?: string;
    role: 'teacher';
}

export interface GetSingleTeacherRes {
    teacher: TeacherEntity;
    selectedCourses: [];
}

export interface TeacherReq {
    name: string;
    last_name: string;
    email: string;
}

