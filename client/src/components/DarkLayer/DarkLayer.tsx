import {Flex} from "@chakra-ui/react";

export const DarkLayer = ({children}) => (
    <Flex
        w="100vw"
        h="100vh"
        bgColor="rgba(0, 0, 0, 0.5)"
        position="fixed"
        top={0}
        left={0}
        justifyContent="center"
        pt={50}
        alignItems="flex-start"
        zIndex={1000}
    > {children} </Flex>
)