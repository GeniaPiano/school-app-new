export const initialLoginInputTouch = {
    email: 0,
    password: 0,
}
export const initialLoginValues = {
    email: "admin@admin.com",
    password: 'adminadmin74337',
}

export const initialRegisterInputTouchCount = {
    email: 0,
    password: 0,
    passwordConfirm: 0,
}

export const initialRegisterInputValues = {
    email: '',
    password: '',
    passwordConfirm: '',
}

export const handleInputChange = (e, setInputValues, setTouchCount) => {
    const {name, value} = e.target;
    setInputValues(prev => ({
        ...prev,
        [name]: value,
    }))
    setTouchCount(prev => ({
        ...prev,
        [e.target.name]: prev[name] + 1
    }))

}