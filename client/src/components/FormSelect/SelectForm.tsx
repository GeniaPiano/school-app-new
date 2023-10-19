import {FormControl, FormLabel, Select, Text} from "@chakra-ui/react";
import {TeacherEntity} from "../../types/teacher";
import {firstLetterToUpper} from "../../utils/firstLetterToUpper";

interface Props {
    data: TeacherEntity[];
    handleChange: (e) => void;
    placeholder: string;
    label: string;
    comment?: string;
    isTeacher?: boolean;
    value?: string;

}




export const SelectForm = ({data, comment, handleChange, placeholder, label, isTeacher, value}:Props) => {

    return (
            <FormControl mb={5}>
                <FormLabel>{label}</FormLabel>
                <Select placeholder={placeholder}
                        variant='filled'
                        outline='none'
                        focusBorderColor="brand.600"
                        onChange={handleChange}
                        comment={comment}
                        value={isTeacher && value  ? value : ''}
                >
                    {
                      data.length !== 0
                        ?  data.map(item=> (
                                 <option key={item.id} value={item.id}>
                                     {firstLetterToUpper(item.name)} {isTeacher && firstLetterToUpper(item.last_name)}
                                 </option>
                             ))
                        :    'No data to select at this moment.'
                    }
                    </Select>
                { comment && <Text mt={2} fontSize='0.8rem' color="teal"> {comment} </Text> }
            </FormControl>
    )
}