

import {Box, Divider, Flex, Heading} from "@chakra-ui/react";




export const NotFoundView = () =>  {


    return (
        <Flex color="gray.500" h="95vh" mt="2.5vh" flexDir="column">
            <Box as="nav" p="30PX">
                <Heading mr={30}
                         color="gray.500"
                         m="20px 0 30px"
                         fontWeight="400"
                         fontSize="xx-large"
                         as="h1"> Not found view. </Heading>
            </Box>
            <Divider  border="3px gray.500 solid" mx={0}/>
        </Flex>
    )

}