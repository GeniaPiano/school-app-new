import {
    Button,
    Flex, Icon,
    List, ListItem,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay, Text
} from "@chakra-ui/react";
import {AppInfo} from "./AppInfo";
import {icons} from "./aboutApp";


interface Props {
    isOpen: boolean;
    onClose: ()=> void;
}
export const AppInfoWindow = ({isOpen, onClose}: Props) => {
    return (
        <Modal  isOpen={isOpen} onClose={onClose} >
            <ModalOverlay />
            <ModalContent color='teal.600'>
                <ModalHeader>About application</ModalHeader>
                <ModalCloseButton />
                <ModalBody mt={3}>
                    <AppInfo/>

                    <Flex mt={5} justifyContent="center" >
                        <Flex gap={3} as={List}> {icons.map(icon => <ListItem><Icon boxSize={8} color="pink.700" as={icon}/></ListItem>)}</Flex>
                    </Flex>
                    <Text mt={5}>Close this window and click <strong>sign in</strong> button to see the DEMO Version as an admin.</Text>


                </ModalBody>

                <ModalFooter mb={5}>
                    <Button ml={5} colorScheme="teal" onClick={onClose}>Close</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}