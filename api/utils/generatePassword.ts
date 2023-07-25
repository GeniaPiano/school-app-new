export const generatePassword = (name: string, last_name: string): string => {
const randomNumbers = Math.floor(Math.random() * 100000).toString()
    return `${name}${last_name}${randomNumbers}`
}