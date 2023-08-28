import {Flex, ModalBody, ModalCloseButton, Text} from "@chakra-ui/react";
import {CheckIcon} from "@chakra-ui/icons";

interface Props {
    text: string
    onClose: ()=> void;
}
export const ConfirmModalContent = ({text, onClose}: Props) => {
    return (
        <ModalBody>
            <ModalCloseButton onClick={onClose}/>
            <Flex w="17rem"
                  h="10rem"
                  alignItems="center"
                  justifyContent="center"
                  gap={6}
                >
                <Text textAlign="center" as="h2" fontSize={20} fontWeight="500"> {text} </Text>
                <CheckIcon boxSize={6} color="teal.400"/>
            </Flex>
        </ModalBody>
    )
}
