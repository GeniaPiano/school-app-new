import {FormControl, Input, Flex, IconButton} from "@chakra-ui/react";
import { useState} from "react";
import {SearchIcon} from "@chakra-ui/icons";

interface Props {
    searchType: "student" | "teacher" | "course";
    onSearch: (phrase: string) => void
}

export const SearchBar = ({searchType, onSearch}:Props) => {

    const [inputVal, setInputVal] = useState<string>('')

    const submit = (e) => {
        e.preventDefault();
        onSearch(inputVal)
        setInputVal('')
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