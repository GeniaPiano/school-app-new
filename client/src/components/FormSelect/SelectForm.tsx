import {FormControl, FormLabel, Select, Text} from "@chakra-ui/react";
import {CourseEntity} from "../../types/course";
import {TeacherEntity} from "../../types/teacher";

interface Props {
    data: CourseEntity[] | TeacherEntity | [];
    handleChange: (e) => void;
    placeholder: string;
    label: string;
    comment?: string;
}




export const SelectForm = ({data, comment, handleChange, placeholder, label}:Props) => {

    return (
            <FormControl mb={10}>
                <FormLabel>{label}</FormLabel>
                <Select placeholder={placeholder}
                        variant='filled'
                        outline='none'
                        focusBorderColor="brand.600"
                        onChange={handleChange}
                        comment={comment}
                >
                    {
                      data.length !== 0
                        ?  data.map(course=> (
                                 <option key={course.id} value={course.id}>
                                     {course.name}</option>
                             ))
                        :    'No data to select at this moment.'
                    }
                    </Select>
                { comment && <Text mt={2} fontSize='0.8rem' color="teal"> {comment} </Text> }
            </FormControl>
    )
}