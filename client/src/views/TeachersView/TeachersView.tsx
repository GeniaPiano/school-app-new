import {
    Box, Divider,
    Flex,
    Modal, ModalOverlay, ModalContent,
    useDisclosure,
} from "@chakra-ui/react";
import {Header} from "../../components/Header/Header";
import {TeacherAddForm} from "../../components/teacherForm/TeacherAddForm";
import {TeacherList} from "../../components/teachers/TeacherList";
import {usePostingData} from "../../provider/PostingDataProvider";
import {ConfirmModalContent} from "../../components/common/ConfirmModalContent";



export const TeachersView = () =>  {

    const {onOpen, onClose, isOpen} = useDisclosure();
    const {isPostedData} = usePostingData();

    return (
        <Flex color="gray.500" h="95vh" mt="2.5vh" flexDir="column">
            <Box>
                <Header title="teachers" buttonText="+ add new teacher" onOpen={onOpen} onClick={onOpen}/>
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent  color="gray.500">
                    <>{isPostedData
                        ? <ConfirmModalContent text="Teacher has been added."   onClose={onClose}/>
                        : <TeacherAddForm onClose={onClose}/>} </>
                    </ModalContent>
                    </Modal>
            </Box>
            <Divider  border="3px gray.500 solid" mx={0}/>
            <TeacherList/>
        </Flex>
    )

}