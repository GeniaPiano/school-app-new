import {teacherFormData} from "./teacherFormData";
import {FormControl, FormErrorMessage, FormLabel, Input,Box} from "@chakra-ui/react";
import {firstLetterToUpper} from "../../utils/firstLetterToUpper";
import {useError} from "../../provider/ErrorProvider";
import {ErrorText} from "../common/ErrorText";

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

export const TeacherFormInputFields = ({inputValues, isError, handleChangeInputValue}:Props) => {

    const {error} = useError();
    return (

        <Box mb={7}>
            {teacherFormData.map((oneForm, i) => (
             <FormControl key={`${oneForm.name}-${i}`} isInvalid={isError[oneForm.name]}>
                <FormLabel>{oneForm.title}</FormLabel>
                <Input
                    name={oneForm.name}
                    value={oneForm.name === "email" ? inputValues[oneForm.name].toLowerCase() : firstLetterToUpper(inputValues[oneForm.name])}
                    onChange={handleChangeInputValue}
                    focusBorderColor="brand.600"/>
                <>{isError[oneForm.name] &&  <FormErrorMessage> {oneForm.errorMessage} </FormErrorMessage>} </>
            </FormControl>
            ))}
            {error && <ErrorText text={error}/>}
        </Box>
    )
}
