import {Box, CloseButton, Flex, Text} from "@chakra-ui/react";
import {CheckIcon} from "@chakra-ui/icons";
import {DarkLayer} from "../DarkLayer/DarkLayer";



interface Props {
    text: string;
    withLayer?: boolean


}

export const ConfirmTextAndIcon = ({text, withLayer}: Props) => {

    return (
       <> {withLayer
            ?  <DarkLayer >
               <Box>

                    <Flex
                        position="relative"
                        w="17rem"
                        h="10rem"
                        bgColor="white"
                        alignItems="center"
                        justifyContent="center"
                        gap={6}
                        borderRadius="8px" padding={10}
                        pr={20}
                    >
                        <Text textAlign="center" color='brand.800' as="h2" fontSize={25} fontWeight="700"> {text} </Text>
                        <CheckIcon boxSize={6} color="brand.800"/>

                </Flex>
               </Box>
            </DarkLayer>
            :       ( <Flex w="17rem"
                           h="10rem"
                           alignItems="center"
                           justifyContent="center"
                           gap={6}
            >
                    <Text textAlign="center" color='brand.800' as="h2" fontSize={25} fontWeight="700"> {text} </Text>
                    <CheckIcon boxSize={6} color="brand.800"/>
                 </Flex>)
        } </>

    )
}