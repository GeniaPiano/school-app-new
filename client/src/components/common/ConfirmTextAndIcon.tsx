import {Flex,  Text} from "@chakra-ui/react";
import {CheckIcon} from "@chakra-ui/icons";
import {DarkLayer} from "../DarkLayer/DarkLayer";



interface Props {
    text: string;
    withLayer?: boolean

}

export const ConfirmTextAndIcon = ({text, withLayer}: Props) => {

    return (
       <> {withLayer
            ?  <DarkLayer>
                <Flex
                      boxShadow="0px 4px 12px rgba(0, 0, 0, 0.1)"
                      borderRadius="8px"
                      bgColor="rgba(0, 0, 0, 0.5)"
                      zIndex={1000}
                >
                    <Flex
                        w="17rem"
                        h="10rem"
                        bgColor="white"
                        alignItems="center"
                        justifyContent="center"
                        gap={6}
                        borderRadius="8px"
                    >
                        <Text textAlign="center" color='brand.800' as="h2" fontSize={25} fontWeight="700"> {text} </Text>
                        <CheckIcon boxSize={6} color="brand.800"/>
                    </Flex>
                </Flex>
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