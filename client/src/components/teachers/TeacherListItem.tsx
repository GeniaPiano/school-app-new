import {
    Badge,
    Button,
    HStack,
    ListItem,
    Modal, ModalBody,
    ModalContent, ModalHeader,
    ModalOverlay,
    Text,
    useDisclosure
} from "@chakra-ui/react";
import {firstLetterToUpper} from "../../utils/firstLetterToUpper";
import {ConfirmDeleteTeacher} from "../ConfirmDeleteTeacher/ConfirmDeleteTeacher";
import {UserItem} from "../common/UserItem";
import {TeacherEntity} from "../../types/teacher";

interface Props {
    teacher: TeacherEntity;
}

export const TeacherListItem = ({teacher}: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <ListItem>
            <UserItem >
                <Text   onClick={onOpen}  _hover={{color: "brand.700"}}>
                    {firstLetterToUpper(teacher.name)} {firstLetterToUpper(teacher.last_name)}
                </Text>
                <HStack>
                    <Button size="xs" colorScheme="teal"  onClick={onOpen} variant="solid">details</Button>
                    <ConfirmDeleteTeacher teacher={teacher} />
                </HStack>
            </UserItem>
            <Modal isOpen={isOpen} onClose={onClose} color='gray.500'>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>
                        {firstLetterToUpper(teacher.name)} {firstLetterToUpper(teacher.last_name)}
                        <br/><Badge  colorScheme='teal' >teacher</Badge>
                    </ModalHeader>
                    <ModalBody>

                    </ModalBody>
                </ModalContent>
                </Modal>
        </ListItem>
    )
}