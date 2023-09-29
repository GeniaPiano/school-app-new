import {
    Flex,
    Modal,
    ModalContent,
    ModalOverlay, useDisclosure,
} from "@chakra-ui/react";

import {StudentsList} from "../../../components/students/StudentsList";
import {Header} from "../../../components/Header/Header";
import {StudentAddForm} from "../../../components/studentForm/StudentAddForm";
import {FormStateProvider} from "../../../providers/FormStateProvider";
import {usePostingData} from "../../../providers/PostingDataProvider";
import {ConfirmModalContent} from "../../../components/common/ConfirmModalContent";
import {SearchBar} from "../../../components/SearchBar/SearchBar";
import {useError} from "../../../providers/ErrorProvider";
import {ErrorText} from "../../../components/common/ErrorText";




export const StudentsView = () =>  {
    const {isPostedData, text} = usePostingData();
    const {onOpen, onClose, isOpen} = useDisclosure();
    const {error} = useError()


        return (
            <Flex  color="gray.500" h="95vh" mt="2.5vh" flexDirection="column" >
                <Header title="students" buttonText="+ add new student" onOpen={onOpen} />
                <SearchBar searchType="student" />
                {error && <ErrorText text={error} color="pink.500" />}


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
                       <StudentsList isSearch={true} mainList={true}/>
                   </Flex>


            </Flex>


        )

}