import {
    Box,
    Flex,
    Modal,
    ModalBody, ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay, Spinner, useDisclosure,
} from "@chakra-ui/react";
import {Header} from "../../layouts/Header";
import {SearchBar} from "../../components/SearchBar/SearchBar";
import {useEffect, useState} from "react";
import {useStudents} from "../../hooks/useStudents";
import {SingleStudentRes} from "../../types/student";
import {StudentsList} from "../../components/Students/StudentsList";


export const StudentsView = () =>  {

    const {getAllStudents} = useStudents();
    const [students, setStudents] = useState<SingleStudentRes[] | null>(null);

    useEffect(()=> {
        (async()=> {
            try {
                const students = await getAllStudents();
                setStudents(students);
                console.log("students", students)

            } catch (e) {
                console.log(e)
            }
        })();
    }, [])

    const {onOpen, onClose, isOpen} = useDisclosure();
        return (
            <Flex color="gray.500" h="95vh" mt="2.5vh" flexDir="column">
                <Box as="nav" p="30PX">
                    <Header title="students" onOpen={onOpen} />
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

                <SearchBar/>
                <Box my={5}>
                    <StudentsList/>
                </Box>




            </Flex>
        )

}