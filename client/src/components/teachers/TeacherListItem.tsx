import {
    Button,
    HStack,
    ListItem,
    Modal, ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useDisclosure
} from "@chakra-ui/react";
import {firstLetterToUpper} from "../../utils/firstLetterToUpper";
import {ConfirmDeleteTeacher} from "../ConfirmDeleteTeacher/ConfirmDeleteTeacher";
import {UserItem} from "../common/UserItem";
import {TeacherEntity} from "../../types/teacher";
import {useState} from "react";
import {useTeachers} from "../../hooks/useTeachers";
import {CourseEntity} from "../../types/course";
import {InfoTeacher} from "./InfoTeacher";
import {GroupButtonsEditSaveCancel} from "../GroupButtonsForm/GroupButtonsEditSaveCancel";
import {TeacherUpdateForm} from "../teacherForm/TeacherUpdateForm";

interface Props {
    teacher: TeacherEntity;
}

export const TeacherListItem = ({teacher}: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {getOneTeacher} = useTeachers();
    const [selectedCourses, setSelectedCourses] = useState<CourseEntity [] | []>([])
    const [isEditing, setIsEditing] = useState<boolean>(false)
    const toggleEditing = () => setIsEditing(prev => !prev)
    const cancelEditing = () => setIsEditing(false)


    const handleOpenTeacherInfo = async() => {
        onOpen();
        const res = await getOneTeacher(teacher.id)
        setSelectedCourses(res.selectedCourses)
    }

    const handleSubmit = () => {
        console.log('submit')
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
            <Modal  isOpen={isOpen} onClose={onClose} color='gray.500'>
                <ModalOverlay/>
                <ModalContent color="gray.500">
                    <>{isEditing
                        ? <> <ModalHeader>Edit teacher data</ModalHeader>
                           <ModalCloseButton/>
                            <ModalBody>
                                 <TeacherUpdateForm teacherId={teacher.id} teacher={teacher}/>
                            </ModalBody>  </>

                        : <InfoTeacher
                            selectedCourses={selectedCourses}
                            teacher={teacher}/> }</>

                    <GroupButtonsEditSaveCancel
                            isEditing={isEditing}
                            toggleEditing={toggleEditing}
                            handleSubmit={handleSubmit}
                            cancelEditing={cancelEditing}
                                            />
                </ModalContent>
                <ModalFooter>

                </ModalFooter>
                </Modal>
        </ListItem>
    )
}