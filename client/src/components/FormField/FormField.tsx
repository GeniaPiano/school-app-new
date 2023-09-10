import { FormControl, FormErrorMessage, FormLabel, Input,} from "@chakra-ui/react";
import {ChangeEvent, FC} from "react";

interface FormFieldProps {
    label: string;
    name: string;
    type: string;
    value: string;
    onChange: ( e: ChangeEvent<HTMLInputElement>) => void;
    error: boolean;
    errorMessage: string;

}

export const FormField:FC<FormFieldProps> = ({   label,
                                                 name,
                                                 type,
                                                 value,
                                                 onChange,
                                                 error,
                                                 errorMessage,
                                             }) => {

    return (
        <FormControl mb={5} isInvalid={error}>
            <FormLabel>{label}</FormLabel>
            <Input
                name={name}
                value={value}
                type={type}
                onChange={(e) => onChange(e)}
                isInvalid={(error)}
                focusBorderColor="brand.600"

            />
            <>
                { error &&
                    <FormErrorMessage>
                        {errorMessage}
                    </FormErrorMessage>
                 }

            </>
        </FormControl>
    );

};
