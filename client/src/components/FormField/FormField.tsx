import {FormControl, FormErrorMessage, FormLabel,HStack, IconButton, Input,} from "@chakra-ui/react";
import {ChangeEvent, FC, useState} from "react";
import {ViewIcon, ViewOffIcon} from "@chakra-ui/icons";

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


    const [showPassword, setShowPassword] = useState(false);
    return (
        <FormControl mb={5} isInvalid={error}>
            <FormLabel color="gray">{label}</FormLabel>
            {type === 'password' ? (
               <HStack> <Input
                    color="teal.500"
                    bg="white"
                    name={name}
                    value={value}
                    type={showPassword ? "text" : "password"}
                    onChange={(e) => onChange(e)}
                    isInvalid={(error)}
                    focusBorderColor="brand.600"/>
                <IconButton
                    aria-label="view icon or view off icon"
                    icon={showPassword?   <ViewOffIcon color="gray.600"/> : <ViewIcon color="gray.600"/>}
                    onClick={() => setShowPassword(!showPassword)}/> </HStack>


            ) : (
                <Input
                    bg="white"
                    color="teal.500"
                    name={name}
                    value={value}
                    type={type}
                    onChange={(e) => onChange(e)}
                    isInvalid={(error)}
                    focusBorderColor="brand.600"

                />
            )}



            <>
                { error &&
                    <FormErrorMessage>
                        {errorMessage}
                    </FormErrorMessage>
                 }

            </>
        </FormControl>
    )

}
