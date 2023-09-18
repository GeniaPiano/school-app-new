import {Flex, Heading} from "@chakra-ui/react";
import {SearchBar} from "../../components/SearchBar/SearchBar";

export const SearchView = () => {

    return  (
        <Flex  color="gray.500" h="95vh" mt="2.5vh" flexDirection="column"  >
            <Heading mr={30}
                     color="gray.500"
                     m="20px 0 30px"
                     fontWeight="400"
                     fontSize="xx-large"
                     as="h1"> Search</Heading>
            <SearchBar/>

        </Flex>
    )
}