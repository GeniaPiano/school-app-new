import {FormControl, FormErrorMessage, FormLabel, Input} from "@chakra-ui/react";
import {userFormData} from "../../utils/userFormData";
import {firstLetterToUpper} from "../../utils/firstLetterToUpper";



export const StudentFormFields = ({handleInputChange, newErrors, inputValues, loading}) => {

    return (
     userFormData.map(oneForm => (
        <FormControl key={oneForm.title} mb={5} isInvalid={!loading && newErrors[oneForm.name]}>
            <FormLabel>{oneForm.title}</FormLabel>
            <Input
                value={oneForm.name === "email" ? inputValues[oneForm.name].toLowerCase() : firstLetterToUpper(inputValues[oneForm.name])}
                name={oneForm.name}
                onChange={handleInputChange}
                type={oneForm.type} focusBorderColor="brand.600"
                isInvalid={
                    (!loading && (newErrors[oneForm.name] || inputValues[oneForm.name].length < oneForm.minCharacters))
                }
            />
            <>
                {oneForm.minCharacters && inputValues[oneForm.name].length < oneForm.minCharacters && (
                    <FormErrorMessage>
                        {oneForm.title} must have at least {oneForm.minCharacters} characters.
                    </FormErrorMessage>
                )} </>
        </FormControl>
    ))
    )
}