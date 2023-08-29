

export interface InitialStudentState {
    name: string;
    last_name: string;
    email: string;
}

export const initialState = (student): { name: string; last_name: string; email: string } => ({
    name: student.name,
    last_name: student.last_name,
    email: student.email,
})