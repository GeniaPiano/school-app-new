

import {Box, Divider, Flex} from "@chakra-ui/react";
import {Header} from "../layouts/Header";



export const NotFoundView = () =>  {


    return (
        <Flex color="gray.500" h="95vh" mt="2.5vh" flexDir="column">
            <Box as="nav" p="30PX">
                <Header title="Not found." />
            </Box>
            <Divider  border="3px gray.500 solid" mx={0}/>
        </Flex>
    )

}