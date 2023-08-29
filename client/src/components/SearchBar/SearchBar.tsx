import {FormControl, Input} from "@chakra-ui/react";


export const SearchBar = () => {
    return (
        <>
            <form>
                <FormControl color="gray.500" fontWeight="bolder">
                    <Input border="2px solid"

                           borderColor="gray.400"
                           focusBorderColor="brand.600"
                           placeholder="Search..."></Input>

                </FormControl>
            </form>
        </>
    )
}