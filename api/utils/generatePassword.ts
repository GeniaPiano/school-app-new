export const generatePassword = (name: string, last_name: string): string => {
const randomNumbers = Math.floor(Math.random() * 100000).toString()
    return `${name.toLowerCase()}${last_name.toLowerCase()}${randomNumbers}`
}