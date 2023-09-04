import {
    AlertDialog,
    AlertDialogBody, AlertDialogCloseButton,
    AlertDialogContent, AlertDialogFooter, AlertDialogHeader,
    AlertDialogOverlay, Badge, Box,
    Button, ButtonGroup, Flex,
    useDisclosure
} from "@chakra-ui/react";
import {Loader} from "../common/Loader";
import {CheckIcon} from "@chakra-ui/icons";
import {firstLetterToUpper} from "../../utils/firstLetterToUpper";
import {Btn} from "../common/Btn";
import {usePostingData} from "../../provider/PostingDataProvider";
import {TeacherEntity} from "../../types/teacher";
import {useTeachers} from "../../hooks/useTeachers";
import {useCounter} from "../../provider/CounterPovider";

interface Props {
    teacher: TeacherEntity;
}

export const ConfirmDeleteTeacher = ({teacher} :Props) => {
    const {onClose, onOpen, isOpen} = useDisclosure();
    const {deleteTeacher} = useTeachers();
    const {incrementTeacherCounter} = useCounter();
    const {isPostedData, changeIsPostedData, isLoadingData, changeIsLoadingData} = usePostingData();

    const handleDeleteTeacher = async() => {
         try {
            const res = await deleteTeacher(teacher.id)
            if (res === 200) {
                changeIsPostedData(true);
                changeIsLoadingData(true);
                setTimeout(() => {
                    changeIsLoadingData(false)
                }, 1500)
                setTimeout(() => {
                    incrementTeacherCounter();
                    onClose();
                    changeIsPostedData(false)
                }, 4000)
            }
        } catch (err) {
            console.log(err)
        }
    }


    return (
        <> <Button size="sm" colorScheme="pink" variant="ghost"  onClick={onOpen}> delete </Button>

            <AlertDialog isOpen={isOpen} onClose={onClose} placement='bottom-start' >

                <AlertDialogOverlay>

                    <  AlertDialogContent minHeight="10vh" >
                        <AlertDialogCloseButton/>
                        <> {isPostedData ?
                            <AlertDialogBody as={Flex} justifyContent="center"> <> {isLoadingData
                                ? <Loader colorScheme="red" loadingText='deleting...' />
                                : <Flex justifyContent='center' alignItems="center" gap={25}>
                                    <Box color='teal'>deleted</Box>
                                    <CheckIcon color="teal"/>
                                </Flex>
                            }</>
                            </AlertDialogBody>
                            : <>
                                <AlertDialogHeader>Delete teacher </AlertDialogHeader>
                                <AlertDialogBody>
                                    Are you sure you want to delete
                                    <Badge mx={1} colorScheme='pink'>{firstLetterToUpper(teacher.last_name)} {firstLetterToUpper(teacher.last_name)} </Badge>  ?
                                    <br/> You cannot undo this action.
                                </AlertDialogBody>
                                <AlertDialogFooter>
                                    <ButtonGroup size='sm'>
                                        <Btn text='delete' type='button' handleClick={handleDeleteTeacher}   colorScheme='pink'/>
                                        <Btn text="cancel" type='button' handleClick={onClose} colorScheme="gray"/>
                                    </ButtonGroup>
                                </AlertDialogFooter>
                            </>
                        } </>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>


    )

}