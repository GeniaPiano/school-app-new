import {
    Button, HStack, ListItem, Modal, ModalContent, ModalOverlay, Text, useDisclosure
} from "@chakra-ui/react";
import {firstLetterToUpper} from "../../utils/firstLetterToUpper";
import {ConfirmDeleteTeacher} from "../ConfirmDeleteTeacher/ConfirmDeleteTeacher";
import {UserItem} from "../common/UserItem";
import {TeacherEntity} from "../../types/teacher";
import {useState} from "react";
import {useTeachers} from "../../hooks/useTeachers";
import {CourseEntity} from "../../types/course";
import {InfoTeacher} from "./InfoTeacher";

interface Props {
    teacher: TeacherEntity;
}

export const TeacherListItem = ({teacher}: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {getOneTeacher} = useTeachers();
    const [selectedCourses, setSelectedCourses] = useState<CourseEntity [] | []>([])

    const handleOpenTeacherInfo = async() => {
        onOpen();
        const res = await getOneTeacher(teacher.id)
        setSelectedCourses(res.selectedCourses)

    }

    return (
        <ListItem>
            <UserItem >
                <Text   onClick={onOpen}  _hover={{color: "brand.700"}}>
                    {firstLetterToUpper(teacher.name)} {firstLetterToUpper(teacher.last_name)}
                </Text>
                <HStack>
                    <Button size="xs" colorScheme="teal"  onClick={handleOpenTeacherInfo} variant="solid">details</Button>
                    <ConfirmDeleteTeacher teacher={teacher} />
                </HStack>
            </UserItem>
            <Modal isOpen={isOpen} onClose={onClose} color='gray.500'>
                <ModalOverlay/>
                <ModalContent>
                    <InfoTeacher selectedCourses={selectedCourses} teacher={teacher}/>
                </ModalContent>
                </Modal>
        </ListItem>
    )
}