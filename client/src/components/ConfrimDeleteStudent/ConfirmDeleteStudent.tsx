import {
    AlertDialog, Box, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay,
    Button, ButtonGroup, Flex, useDisclosure, Badge,
} from "@chakra-ui/react";

import {StudentEntity} from "../../types/student";
import {useStudents} from "../../hooks/useStudents";
import {useParams} from 'react-router-dom'
import {firstLetterToUpper} from "../../utils/firstLetterToUpper";
import {usePostingData} from "../../providers/PostingDataProvider";
import {useCounter} from "../../providers/CounterPovider";
import {CheckIcon} from "@chakra-ui/icons";
import {Btn} from "../common/Btn";
import {Loader} from "../common/Loader";



interface Props {
    student: StudentEntity;
    mainList:boolean;
    courseName: string;

}

export const  ConfirmDeleteStudent = ({student, mainList, courseName}: Props) => {
    const {onClose, onOpen, isOpen} = useDisclosure();
    const { incrementStudentCounter} = useCounter()
    const {deleteStudent, deleteCourseFromStudent } = useStudents();
    const {courseId}: string = useParams();


    const handleDeleteStudent = async() => {
        try {
            const res = await deleteStudent(student.id)
            if (res === 200) {
                changeIsPostedData(true);
                changeIsLoadingData(true);
                setTimeout(() => {
                    changeIsLoadingData(false)
                }, 1500)
                setTimeout(() => {
                    incrementStudentCounter();
                    changeIsPostedData(false)
                }, 4000)
            }

        } catch (err) {
            console.log(err)
        }
    }

    const handleRemoveStudentFromCourse = async() => {
        try {
            const res = await deleteCourseFromStudent(student.id, courseId)
            if (res === 200) {
                changeIsPostedData(true);
                changeIsLoadingData(true);
                setTimeout(() => {
                    changeIsLoadingData(false)
                }, 1500)
                setTimeout( () => {
                    incrementStudentCounter();
                    onClose();
                    changeIsPostedData(false)
                }, 4000)
            }

        } catch (err) {
            console.log(err)
        }
    }

    const {isLoadingData, isPostedData, changeIsPostedData, changeIsLoadingData} = usePostingData();




    return (
        <> <Button size="sm" colorScheme="pink" variant="ghost"  onClick={onOpen}> delete </Button>

            <AlertDialog isOpen={isOpen} onClose={onClose} placement='bottom-start' >

                <AlertDialogOverlay  >
                    <  AlertDialogContent minHeight="10vh"   >
                        <> {isPostedData ?
                            <AlertDialogBody as={Flex} justifyContent="center"> <>{isLoadingData
                                ? <Loader colorScheme="red" loadingText='deleting...' />
                                : <Flex justifyContent='center' alignItems="center" gap={25}>
                                    <Box color='teal'>deleted</Box>
                                    <CheckIcon color="teal"/>
                                 </Flex>
                                }</>
                            </AlertDialogBody>
                            : <>
                                <AlertDialogHeader>Delete student </AlertDialogHeader>
                                <AlertDialogBody>

                                    Are you sure you want to delete
                                    <Badge mx={1} colorScheme='pink'> {firstLetterToUpper(student.name)} {firstLetterToUpper(student.last_name)} </Badge>
                                    {mainList ? '?' : `from ${courseName} ?`  }

                                </AlertDialogBody>
                                <AlertDialogFooter>
                                    <ButtonGroup size='sm'>
                                        <Btn text='delete' type='button' handleClick={mainList? handleDeleteStudent : handleRemoveStudentFromCourse}   colorScheme='pink'/>
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
