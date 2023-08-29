export const teacherFormData = [
    {
        name: "name",
        title: "Name",
        errorMessage: "Name is required. It should contain from 2 to 40 chars."
    },
    {
        name: "last_name",
        title: "Lastname",
        errorMessage: "Lastname is required. It should contain from 2 to 40 chars."
    },
    {
        name: "email",
        title: "Email",
        errorMessage: "Email is required. It should contain from 3 to 40 chars and it should contain '@'."
    }
]

export const initialStateTeacher = {
    name: '',
    last_name: "",
    email: "",
}

export const initialStateTouchCount = {
    name: 0,
    last_name: 0,
    email: 0,
}

