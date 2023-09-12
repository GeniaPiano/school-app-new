import {
    Box,
    Flex,
    Modal,
    ModalBody, ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay, useDisclosure, useToast,
} from "@chakra-ui/react";

import {StudentsList} from "../../components/students/StudentsList";
import {Header} from "../../components/Header/Header";
import {StudentAddForm} from "../../components/studentForm/StudentAddForm";
import {FormStateProvider} from "../../providers/FormStateProvider";
import {usePostingData} from "../../providers/PostingDataProvider";
import {ConfirmModalContent} from "../../components/common/ConfirmModalContent";


export const StudentsView = () =>  {
    const {isPostedData, text} = usePostingData();
    const {onOpen, onClose, isOpen} = useDisclosure();
        return (

            <Flex  color="gray.500" h="95vh" mt="2.5vh" flexDirection="column"  >
                <Header title="students" buttonText="+ add new student" onOpen={onOpen} />
                { isPostedData
                    ? <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent  color="gray.500">
                            <ConfirmModalContent text={text}  onClose={onClose} />
                        </ModalContent>
                    </Modal>
                    : ( <FormStateProvider forAdding={true}>
                        <StudentAddForm isOpen={isOpen} onClose={onClose}/>
                    </FormStateProvider>) }

                   <Flex my={5}>
                       <StudentsList mainList={true}/>
                   </Flex>


            </Flex>
        )

}