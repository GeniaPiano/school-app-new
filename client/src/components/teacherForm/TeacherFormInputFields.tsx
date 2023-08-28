import {teacherFormData} from "./teacherFormData";
import {FormControl, FormErrorMessage, FormLabel, Input} from "@chakra-ui/react";
import {firstLetterToUpper} from "../../utils/firstLetterToUpper";

interface Props {
    inputValues: {
        name: string,
        last_name: string,
        email: string,
    };
    isError: {
        name: boolean,
        last_name: boolean,
        email: boolean,
    };
    handleChangeInputValue: (e)=> void;
}

export const TeacherFormInputFields = ({inputValues, isError, handleChangeInputValue}:Props) => teacherFormData.map(oneForm => (
    <FormControl key={oneForm.name} isInvalid={isError[oneForm.name]}>
        <FormLabel>{oneForm.title}</FormLabel>
        <Input
            name={oneForm.name}
            value={oneForm.name === "email" ? inputValues[oneForm.name].toLowerCase() : firstLetterToUpper(inputValues[oneForm.name])}
            onChange={handleChangeInputValue}
            focusBorderColor="brand.600"/>
        <>{isError[oneForm.name] &&  <FormErrorMessage> {oneForm.errorMessage} </FormErrorMessage>} </>
    </FormControl>
))
