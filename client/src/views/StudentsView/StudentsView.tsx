import {
    Flex, List, ListItem,
    Modal, ModalBody,
    ModalContent, ModalHeader,
    ModalOverlay, useDisclosure, Text, ModalCloseButton
} from "@chakra-ui/react";

import {StudentsList} from "../../components/students/StudentsList";
import {Header} from "../../components/Header/Header";
import {StudentAddForm} from "../../components/studentForm/StudentAddForm";
import {FormStateProvider} from "../../providers/FormStateProvider";
import {usePostingData} from "../../providers/PostingDataProvider";
import {ConfirmModalContent} from "../../components/common/ConfirmModalContent";
import {SearchBar} from "../../components/SearchBar/SearchBar";
import { useState} from "react";
import { StudentEntity} from "../../types/student";
import {useStudents} from "../../hooks/useStudents";
import {useError} from "../../providers/ErrorProvider";
import {ErrorText} from "../../components/common/ErrorText";
import {firstLetterToUpper} from "../../utils/firstLetterToUpper";


export const StudentsView = () =>  {
    const {isPostedData, text} = usePostingData();
    const {getSearchStudents} = useStudents();
    const {onOpen, onClose, isOpen} = useDisclosure();
    const {onOpen: onOpenSearchList, onClose: onCloseSearchList, isOpen: isOpenSearchList} = useDisclosure();
    const [ searchList, setSearchList] = useState<StudentEntity[] | []>([])
    const {error, dispatchError} = useError()

    const handleSearch = async(searchPhrase: string) => {
        if (searchPhrase !== '') {
            const res = await getSearchStudents(searchPhrase)
            setSearchList(res)
            onOpenSearchList();
        } else {
            dispatchError('Enter at least 1 char.')
        }
    }


        return (
            <Flex  color="gray.500" h="95vh" mt="2.5vh" flexDirection="column" >
                <Header title="students" buttonText="+ add new student" onOpen={onOpen} />
                <SearchBar searchType="student" onSearch={handleSearch}/>
                {error && <ErrorText text={error} />}
                <Modal isOpen={isOpenSearchList} onClose={onCloseSearchList}>
                    <ModalOverlay/>
                    <ModalContent >
                        <ModalCloseButton/>
                        <ModalHeader  color="teal">Search Results</ModalHeader>
                        <ModalBody mb={10}>
                            {searchList.length > 0 ?  (
                                <List>
                                    {searchList.map(one => (
                                        <ListItem  color="gray.600" key={one.id}>{firstLetterToUpper(one.name)}  {firstLetterToUpper(one.last_name)}</ListItem>
                                    ))}
                                </List>
                            ) : <Text>No search results with given phrase. </Text>}
                        </ModalBody>
                    </ModalContent>
                </Modal>

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