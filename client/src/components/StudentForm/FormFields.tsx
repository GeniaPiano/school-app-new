
import {FormControl, FormErrorMessage, FormLabel, Input} from "@chakra-ui/react";
import {formFieldsData} from "./formFieldsData";
import {firstLetterToUpper} from "../../utils/firstLetterToUpper";

export const FormFields = ({handleInputChange, newErrors, inputValues, loading}) => {

    return (
     formFieldsData.map(oneForm => (
        <FormControl key={oneForm.title} mb={5} isInvalid={!loading && newErrors[oneForm.name]}>
            <FormLabel>{oneForm.title}</FormLabel>
            <Input
                value={firstLetterToUpper(inputValues[oneForm.name])}
                name={oneForm.name}
                onChange={handleInputChange}
                type={oneForm.type} focusBorderColor="brand.600"
            />
            { newErrors[oneForm.name] &&
                <FormErrorMessage>{oneForm.errorMessage}</FormErrorMessage>
            }
        </FormControl>
    ))
    )
}