import {FormControl, Input} from "@chakra-ui/react";


export const SearchBar = () => {
    return (
        <>
            <form>
                <FormControl color="gray.500" fontWeight="bolder">
                    <Input border="3px solid" borderColor="gray.300"   focusBorderColor="brand.600" placeholder="Search..."></Input>

                </FormControl>
            </form>
        </>
    )
}