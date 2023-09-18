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
import {AddUserProvider} from "../../providers/AddUserProvider";
import {SearchBar} from "../../components/SearchBar/SearchBar";
import {ErrorText} from "../../components/common/ErrorText";
import {useError} from "../../providers/ErrorProvider";
import {useSearch} from "../../providers/SearchProvider";





export const TeachersView = () => {

const {onOpen, onClose, isOpen} = useDisclosure();
const {isPostedData, text } = usePostingData();
const {error} = useError()



    return (
        <Flex color="gray.500" h="95vh" mt="2.5vh" flexDir="column">

                <Box>
                <Header title="teachers" buttonText="+ add new teacher" onOpen={onOpen} onClick={onOpen}/>
                    <SearchBar searchType="teacher" />
                    {error && <ErrorText text={error} color="pink.500" />}
                     { isPostedData
                        ? <Modal isOpen={isOpen} onClose={onClose}>
                            <ModalOverlay />
                            <ModalContent  color="gray.500">
                                <ConfirmModalContent text={text}  onClose={onClose} />
                            </ModalContent>
                        </Modal>
                        : ( <AddUserProvider>
                            <FormStateProvider forAdding={true}>
                                <TeacherAddForm  onClose={onClose} isOpen={isOpen}/>
                            </FormStateProvider>
                         </AddUserProvider>)
                        }
                </Box>


            <FormStateProvider forAdding={false}>
                <TeacherList/>
            </FormStateProvider>

        </Flex>
    )

}