import {FormControl, Input, Flex, IconButton} from "@chakra-ui/react";
import { useState} from "react";
import {SearchIcon} from "@chakra-ui/icons";
import {useSearch} from "../../providers/SearchProvider";
import {useError} from "../../providers/ErrorProvider";

interface Props {
    searchType: "student" | "teacher" | "course";
}

export const SearchBar = ({searchType}:Props) => {
    const {setSearchStudent} = useSearch()
    const [inputVal, setInputVal] = useState<string>('')
    const {dispatchError} = useError()

    const submit = (e) => {
        e.preventDefault();
        if (inputVal !== '') {
            setSearchStudent(inputVal)

        } else {
            dispatchError('Enter at least one char.')
            setSearchStudent('')
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