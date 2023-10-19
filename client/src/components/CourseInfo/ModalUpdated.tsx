import {Box, Flex, ModalBody} from "@chakra-ui/react";
import {CheckIcon} from "@chakra-ui/icons";

export const ModalUpdated = () => {
    return (
        <ModalBody p="60px 30px" as={Flex} justifyContent='center' alignItems="center" gap={25}>
            <Box color='teal'>Updated</Box>
            <CheckIcon color="teal"/>
        </ModalBody>
    )
}