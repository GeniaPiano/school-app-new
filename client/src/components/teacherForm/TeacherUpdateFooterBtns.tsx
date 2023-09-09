import {Button, ModalFooter} from "@chakra-ui/react";
import {SyntheticEvent} from "react";

interface Props {
    handleSubmit: (e: SyntheticEvent)=>void;
    cancelEditing: ()=> void
}

export const TeacherUpdateFooterBtns = ({handleSubmit, cancelEditing}: Props) =>  (
        <ModalFooter>
            <Button
                color="gray.500"
                colorScheme='gray'
                mr={3}
                onClick={handleSubmit}>
                Save
            </Button>
            <Button  color="gray.500"
                     colorScheme='gray'
                     onClick={cancelEditing}
            >Cancel</Button>
        </ModalFooter>
    )
