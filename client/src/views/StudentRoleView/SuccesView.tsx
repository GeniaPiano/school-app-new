import {Flex, Text, Heading, Box} from "@chakra-ui/react";

export const SuccessView = () => {
    return (
        <Flex color="gray.500" h="95vh" mt="2.5vh" width="80%" flexDir="column" mb="5em" mr="4.5em">
            <Box>
                <Heading mr={30}
                         color="myPink.600"
                         m="20px 0 30px"
                         fontWeight="400"
                         fontSize="xx-large"
                         as="h1"> Success!
                </Heading>
                <Text>You have just purchased the best sport and dance classes!</Text>
            </Box>
        </Flex>
    )
}