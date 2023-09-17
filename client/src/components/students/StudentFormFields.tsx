import {Box} from "@chakra-ui/react";
import {userFormData} from "../../utils/userFormData";
import {FormField} from "../FormField/FormField";


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

export  const StudentFormFields = ({inputValues, isError, handleChangeInputValue}: Props) => {

    return (
        <Box mb={7}>
            {userFormData.map((oneForm) => (
                <FormField
                    key={oneForm.title}
                    name={oneForm.name}
                    value={inputValues[oneForm.name]}
                    type={oneForm.type}
                    label={oneForm.title}
                    errorMessage={oneForm.errorMessage}
                    error={isError[oneForm.name]}
                    onChange={handleChangeInputValue}
                />
            ))}

        </Box>
    )

}