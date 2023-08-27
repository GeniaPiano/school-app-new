import {
    Box, Divider,
    Flex,
    Modal,
    useDisclosure,
} from "@chakra-ui/react";
import {Header} from "../../components/Header/Header";
import {TeacherForm} from "../../components/teacherForm/TeacherForm";
import {TeacherList} from "../../  config/teachers/TeacherList";



export const TeachersView = () =>  {

    const {onOpen, onClose, isOpen} = useDisclosure();
    return (
        <Flex color="gray.500" h="95vh" mt="2.5vh" flexDir="column">
            <Box as="nav" p="30PX">
                <Header title="teachers" buttonText="+ add new teacher" onOpen={onOpen} />
                <Modal isOpen={isOpen} onClose={onClose}>
                    <TeacherForm/>
                </Modal>
            </Box>
            <Divider  border="3px gray.500 solid" mx={0}/>
            <TeacherList/>
        </Flex>
    )

}