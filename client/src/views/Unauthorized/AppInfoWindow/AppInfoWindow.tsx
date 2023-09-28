import {
    Button,Box,
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
import {useAppInfo} from "../../../providers/AppInfoProvider";



export const AppInfoWindow = () => {

    const {isOpen, onClose} = useAppInfo();
    return (
        <Modal  isOpen={isOpen} onClose={onClose} >
            <ModalOverlay />
            <ModalContent color='teal.600'>
                <ModalHeader>About application</ModalHeader>
                <ModalCloseButton />
                <ModalBody mt={3}>
                    <AppInfo/>

                    <Box mt={3} textAlign="justify">
                        <Text fontWeight="700" >Note:</Text> The application is currently under active development, working on adding new features and improvements.

                    </Box>

                    <Flex mt={5} justifyContent="center" >
                        <Flex gap={3} as={List}> {icons.map((icon, i) => <ListItem key={i} ><Icon boxSize={8} color="pink.700" as={icon}/></ListItem>)}</Flex>
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