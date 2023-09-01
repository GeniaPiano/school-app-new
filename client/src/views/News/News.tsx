import {Box, Flex, Heading} from "@chakra-ui/react";



export const News = () =>  {


    return (
        <Flex color="gray.500" h="95vh" mt="2.5vh" flexDir="column">
            <Box>
                <Heading mr={30}
                         color="gray.500"
                         m="20px 0 30px"
                         fontWeight="400"
                         fontSize="xx-large"
                         as="h1"> News </Heading>
            </Box>

        </Flex>
    )

}