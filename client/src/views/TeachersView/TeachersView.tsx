import {
    Box, Divider,
    Flex,
    Modal,
    ModalBody, ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay, useDisclosure,
} from "@chakra-ui/react";
import {Header} from "../../layouts/Header";


export const TeachersView = () =>  {

    const {onOpen, onClose, isOpen} = useDisclosure();
    return (
        <Flex color="gray.500" h="95vh" mt="2.5vh" flexDir="column">
            <Box as="nav" p="30PX">
                <Header title="teachers" onOpen={onOpen} />
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent  color="gray.500">
                        <ModalHeader>Add new teacher</ModalHeader>
                        <ModalCloseButton/>
                        <ModalBody> form </ModalBody>
                        <ModalFooter>footer </ModalFooter>
                    </ModalContent>
                </Modal>
            </Box>
            <Divider  border="3px gray.500 solid" mx={0}/>
        </Flex>
    )

}