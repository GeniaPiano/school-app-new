import {FormControl, FormLabel, Select} from "@chakra-ui/react";
import {ReactNode} from "react";

interface Props {
    handleSelect: (e)=> void;
    placeholder: string;
    children: ReactNode;
}

export const FormSelect = ({handleSelect, placeholder, children}: Props) => (
    <FormControl mb={8}>
        <FormLabel>Courses</FormLabel>
        <Select onChange={handleSelect}
                placeholder={placeholder}
                variant='filled'
                outline='none'
                focusBorderColor="brand.600"
        >
            <>{children}</>
        </Select>
    </FormControl>
)