import {
    Box, Divider,
    Flex,
    Modal, ModalOverlay, ModalContent,
    useDisclosure,
} from "@chakra-ui/react";
import {Header} from "../../components/Header/Header";
import {TeacherAddForm} from "../../components/teacherForm/TeacherAddForm";
import {TeacherList} from "../../components/teachers/TeacherList";
import {usePostingData} from "../../providers/PostingDataProvider";
import {ConfirmModalContent} from "../../components/common/ConfirmModalContent";
import {FormStateProvider} from "../../providers/FormStateProvider";




export const TeachersView = () =>  {

    const {onOpen, onClose, isOpen} = useDisclosure();
    const {isPostedData, text} = usePostingData();

    return (
        <Flex color="gray.500" h="95vh" mt="2.5vh" flexDir="column">
            <Box>
                <Header title="teachers" buttonText="+ add new teacher" onOpen={onOpen} onClick={onOpen}/>
                     { isPostedData
                        ? <Modal isOpen={isOpen} onClose={onClose}>
                            <ModalOverlay />
                            <ModalContent  color="gray.500">
                                <ConfirmModalContent text={text}  onClose={onClose} />
                            </ModalContent>
                        </Modal>
                        : ( <FormStateProvider forAdding={true}>
                                <TeacherAddForm  onClose={onClose} isOpen={isOpen}/>
                            </FormStateProvider> )
                        }

            </Box>
            <Divider  border="3px gray.500 solid" mx={0}/>
            <FormStateProvider forAdding={false}>
                <TeacherList/>
            </FormStateProvider>

        </Flex>
    )

}