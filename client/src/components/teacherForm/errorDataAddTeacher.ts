interface InputTouchCountInterface {
    name: number
    last_name: number;
    email: number;
}

interface InputValuesInterface {
    name: string;
    last_name: string;
    email: string;
}


export const errorDataAddTeacher = (inputTouchedCount: InputTouchCountInterface, inputValues: InputValuesInterface) => {
    const {name, last_name, email} = inputValues;
    return {
        name: (inputTouchedCount.name > 2 && (name === '' || name.length < 2 || name.length > 40)),
        last_name: (inputTouchedCount.last_name > 2 && (last_name === '' || last_name.length < 2 || last_name.length > 40)),
        email: (inputTouchedCount.email > 3 && (email === '' || email.length < 4 || email.length > 40 || !email.includes('@')) ),
    }
}