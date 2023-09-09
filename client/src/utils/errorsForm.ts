

type FormErrors = {
    name: boolean;
    last_name: boolean;
    email: boolean;
}

export const errors: (inputValues) => FormErrors = (inputValues) => ({
    name: inputValues.name.length < 3 || inputValues.name.length > 40 || inputValues.name === '',
    last_name: inputValues.last_name.length < 3 || inputValues.last_name.length > 40 || inputValues.last_name === '',
    email: ( inputValues.email.length < 4 || inputValues.email.length > 40 || !inputValues.email.includes('@')
)

});