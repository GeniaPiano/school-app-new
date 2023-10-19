import {Flex, ModalBody, Text} from "@chakra-ui/react";
import {ArrowDownIcon} from "@chakra-ui/icons";

interface Props {
    name: string;
    closeModal: () => void;
}
export const ModalWarning = ({name, closeModal}: Props) => {
    return (
        <ModalBody mb={30}>
            <Flex my={10}  fontWeight="500"  >
                <Text mr={4}> Cannot delete </Text>
                <Text bg="teal.200" px={2} borderRadius="2px">{name.toUpperCase()}</Text>
            </Flex>
            <Text>Remove students from this course first.</Text>

            <Flex mt={37} justifyContent="center">
                <ArrowDownIcon _hover={{color:"teal.300"}} color="teal.500" boxSize={5} cursor='pointer' onClick={closeModal}/>
            </Flex>
        </ModalBody>
    )
}