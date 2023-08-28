import {SingleStudentRes} from "../../types/student";
import {UserItem} from "../common/UserItem";
import {
    Button,
    ListItem,
    Modal,
    ModalContent,
    ModalFooter,
    ModalOverlay,
    useDisclosure
} from "@chakra-ui/react";
import {InfoStudentModal} from "../students/InfoStudentModal";
import {useState} from "react";
import {firstLetterToUpper} from "../../utils/firstLetterToUpper";

export const StudentsListAllItem = (props: SingleStudentRes) => {
    const {student, selectedCourses} = props.student
    const {isOpen, onClose, onOpen} = useDisclosure();
    const [isEditing, setIsEditing] = useState(false);

    return (
        <>
            <UserItem as={ListItem} onOpen={onOpen} >
                <p>{firstLetterToUpper(student.name)} {firstLetterToUpper(student.last_name)}</p>
            </UserItem>

            <Modal mb={5} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay/>
                    <ModalContent>
                        <InfoStudentModal student={student} selectedCourses={selectedCourses}/>
                        <ModalFooter>
                            <Button type={isEditing ? "submit" : "button"}
                                    color="gray.500"
                                    colorScheme='gray'
                                    mr={3}
                                    // onClick={handleSubmit}
                            >
                                {isEditing ? 'Save' : 'Edit'}</Button>
                            <> {isEditing && (
                                <Button  color="gray.500" mr={3}
                                         colorScheme='gray'
                                         // onClick={cancelEditing}
                                >Cancel</Button>
                            )} </>
                        </ModalFooter>
                    </ModalContent>
            </Modal>
        </>

    )
}
