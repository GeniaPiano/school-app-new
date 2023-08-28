import {
    Box,
    Flex,
    Modal,
    ModalBody, ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay, useDisclosure,
} from "@chakra-ui/react";

import {SearchBar} from "../../components/SearchBar/SearchBar";
import {StudentsList} from "../../components/students/StudentsList";
import {Header} from "../../components/Header/Header";


export const StudentsView = () =>  {



    const {onOpen, onClose, isOpen} = useDisclosure();
        return (
            <Flex color="gray.500" h="95vh" mt="2.5vh" flexDir="column">
                <Box as="nav" p="30px">
                    <Flex>
                        <Header title="students" buttonText="+ add new student" onOpen={onOpen} />
                    </Flex>
                    <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent  color="gray.500">
                            <ModalHeader>Add new student to </ModalHeader>
                            <ModalCloseButton/>
                            <ModalBody> form </ModalBody>
                            <ModalFooter>footer </ModalFooter>
                        </ModalContent>
                    </Modal>
                </Box>
            <Flex display="column">
                <SearchBar/>
                <Box my={5}>
                    <StudentsList/>
                </Box>
            </Flex>


            </Flex>
        )

}