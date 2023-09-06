import {Box} from "@chakra-ui/react";

import {ChangeEvent, useState} from "react";
import {TeacherEntity, TeacherBasicData} from "../../types/teacher";
import {userFormData} from "../../utils/userFormData";
import {firstLetterToUpper} from "../../utils/firstLetterToUpper";
import {initialStateValues} from "./initialState";
import {errors} from "../../utils/errorsForm";
import {FormField} from "../FormField/FormField";


interface Props {
    teacher: TeacherEntity
}

export const TeacherUpdateForm = ({teacher}:Props) => {

    const [inputValues, setInputValues] = useState<TeacherBasicData>(initialStateValues(teacher))

    const handleInputChange = (  e: ChangeEvent<HTMLInputElement>) => {
        setInputValues((prev) => {
            const {name, value} = e.target
            return {
                ...prev,
                [name]: name === 'email' ? value.toLowerCase() : firstLetterToUpper(value)
              }
        })
    };

    const newErrors = errors(inputValues)

    return (
        <Box>
            <form>

                {userFormData.map((oneForm) => (
                    <FormField key={oneForm.title}
                               name={oneForm.name}
                               value={inputValues[oneForm.name]}
                               type={oneForm.type}
                               label={oneForm.title}
                               errorMessage={oneForm.errorMessage}
                               error={newErrors[oneForm.name]}
                               onChange={handleInputChange}

                    />
                ))}



            </form>
        </Box>
    )
}