import {Text, Flex, Heading} from "@chakra-ui/react";
import {useAuth} from "../../hooks/useAuth";


export const Home = () => {

    const {user} = useAuth()
    return (
        <Flex color="gray.500" w="100%" h="95vh" mt="2.5vh" flexDir="column" mb="5em">
            <div>

                <Heading mr={30}
                         color="gray.500"
                         m="20px 0 30px"
                         fontWeight="400"
                         fontSize="xx-large"
                         as="h1"> Hello {"name" in user ? user.name : ''} {"last_name" in user ? user.last_name : ''} </Heading>
            </div>




        </Flex>
    )
}