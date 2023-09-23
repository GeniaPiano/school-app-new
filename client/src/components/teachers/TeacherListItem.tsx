import {
    Button,
    HStack,
    ListItem,
    Modal, ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Text,
    useDisclosure
} from "@chakra-ui/react";
import {firstLetterToUpper} from "../../utils/firstLetterToUpper";
import {ConfirmDeleteTeacher} from "../ConfirmDeleteTeacher/ConfirmDeleteTeacher";
import {UserItem} from "../common/UserItem";
import {TeacherEntity} from "../../types/teacher";
import {useEffect, useState} from "react";
import {useTeachers} from "../../hooks/useTeachers";
import {CourseEntity} from "../../types/course";
import {InfoTeacher} from "./InfoTeacher";
import {TeacherUpdateForm} from "../teacherForm/TeacherUpdateForm";
import { useFormState} from "../../providers/FormStateProvider";
import {useCounter} from "../../providers/CounterPovider";
import {ConfirmationBeforeClosing} from "../ConfirmationBeforeClosing/ConfirmationBeforeClosing";

interface Props {
    teacher: TeacherEntity;
}

export const TeacherListItem = ({teacher}: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {getOneTeacher} = useTeachers();
    const [selectedCourses, setSelectedCourses] = useState<CourseEntity [] | []>([])
    const {isEditing,  openConfirmation} = useFormState();
    const {counterTeacher} = useCounter()



    useEffect(()=> {
        (async ()=> {
            const res = await getOneTeacher(teacher.id)
            setSelectedCourses(res.selectedCourses)
        })()
    }, [counterTeacher])

    const handleOpenTeacherInfo = async() => {
        onOpen();

    }



    return (
        <ListItem>
            <UserItem  onOpen={onOpen}>
                <Text   onClick={onOpen}  _hover={{color: "brand.700"}}>
                    {firstLetterToUpper(teacher.name)} {firstLetterToUpper(teacher.last_name)}
                </Text>
                <HStack>
                    <Button size="xs" colorScheme="teal"  onClick={handleOpenTeacherInfo} variant="solid">details</Button>
                    <ConfirmDeleteTeacher teacher={teacher} />
                </HStack>
            </UserItem>
            <Modal
                isOpen={isOpen}
                onClose={isEditing ? openConfirmation : onClose}
                color='gray.500'>
                <ModalOverlay/>
                <ModalContent color="gray.500">
                    <>
                        <ModalCloseButton />
                        {isEditing
                            ? <> <ModalHeader>Edit teacher data</ModalHeader>
                                <ModalBody>
                                    <TeacherUpdateForm teacher={teacher}
                                                       selectedCourses={selectedCourses}/>
                                </ModalBody>  </>

                            : <InfoTeacher selectedCourses={selectedCourses}
                                           teacher={teacher}/>
                        } </>

                </ModalContent>
            </Modal>
            <ConfirmationBeforeClosing

            />

        </ListItem>
    )
}