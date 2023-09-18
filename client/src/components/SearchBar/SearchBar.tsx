import {FormControl, Input, Flex, IconButton} from "@chakra-ui/react";
import { useState} from "react";
import {SearchIcon} from "@chakra-ui/icons";
import {useSearch} from "../../providers/SearchProvider";
import {useError} from "../../providers/ErrorProvider";

interface Props {
    searchType: "student" | "teacher" | "course";
}

export const SearchBar = ({searchType}:Props) => {
    const {setSearchStudent, changeStudentTitle, setSearchTeacher, changeTeacherTitle} = useSearch()
    const [inputVal, setInputVal] = useState<string>('')
    const {dispatchError} = useError()

    const submit = (e) => {
        e.preventDefault();
        switch (searchType) {
            case "student":
                if (inputVal !== '') {
                    setSearchStudent(inputVal);
                    changeStudentTitle(`Search results with "${inputVal}":`);
                } else {
                    dispatchError('Enter at least one character.');
                    setSearchStudent('');
                    changeStudentTitle('All students: ');
                }
                break;
            case "teacher":
                if (inputVal !== '') {
                    setSearchTeacher(inputVal);
                    changeTeacherTitle(`Search results with "${inputVal}":`);
                } else {
                    dispatchError('Enter at least one character.');
                    setSearchTeacher('');
                    changeTeacherTitle('All teachers: ');
                }
                break;
            default:

                break;
        }
    }


    return (
        <>
            <Flex as="form" onSubmit={submit} gap={1}>
                <FormControl color="gray.500" fontWeight="bolder">
                    <Input border="2px solid"
                           borderColor="gray.400"
                           focusBorderColor="brand.600"
                           placeholder={`Search ${searchType}...`}
                           value={inputVal}
                           onChange={(e)=> setInputVal(e.target.value)}

                    ></Input>

                </FormControl>
                <IconButton type="submit" aria-label={`Search ${searchType}...`} icon={<SearchIcon />} />
            </Flex>
        </>
    )
}