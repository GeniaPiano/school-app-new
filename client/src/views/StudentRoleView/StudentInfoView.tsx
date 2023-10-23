import {Flex, Heading} from "@chakra-ui/react";
import {Map} from '../../components/Map/Map'

export const StudentInfoView = () => {
    return (
        <Flex  color="gray.500" w="100%" h="95vh"  flexDir="column" mb="5em">
            <div>
                <Heading
                         color="gray.500"
                         m="10px 0 10px 5px"
                         fontWeight="400"
                         fontSize="xx-large"
                         as="h1"> School info </Heading>
            </div>

            <Map/>
        </Flex>
    )
}