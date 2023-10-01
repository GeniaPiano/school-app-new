import {Flex, Text, Heading} from "@chakra-ui/react";
import {Map} from '../../components/Map/Map'

export const StudentInfoView = () => {
    return (
        <Flex  color="gray.500" w="100%" h="95vh" mt="2.5vh" flexDir="column" alignItems="center" mb="5em">
            <div>
                <Heading mr={30}
                         color="gray.500"
                         m="20px 0 30px"
                         fontWeight="400"
                         fontSize="xx-large"
                         as="h1"> School info </Heading>
            </div>

            <Text fontSize="xl" color="pink.500">Check out our new locations!</Text>
            <Map/>
        </Flex>
    )
}