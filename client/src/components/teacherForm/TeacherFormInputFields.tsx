
import {Box} from "@chakra-ui/react";

import {useError} from "../../providers/ErrorProvider";
import {userFormData} from "../../utils/userFormData";
import {FormField} from "../FormField/FormField";
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
                >

                </FormField>
            ))}
            {error && <ErrorText text={error}/>}
        </Box>
    )
}
