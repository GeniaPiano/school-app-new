import {Button, ModalFooter} from "@chakra-ui/react";
import {SyntheticEvent} from "react";

interface Props {
    isEditing: boolean;
    handleSubmit: (e: SyntheticEvent) => void;
    cancelEditing: ()=> void;
    toggleEditing: ()=> void;
}

export const GroupButtonsEditSaveCancel = ({isEditing, handleSubmit, cancelEditing, toggleEditing}: Props) => {

  return (  <ModalFooter>
        <Button type={isEditing ? "submit" : "button"}
                color="gray.500"
                colorScheme='gray'
                mr={3}
                onClick={isEditing? handleSubmit : toggleEditing}>
            {isEditing ? 'Save' : 'Edit'}
        </Button>
        <> {isEditing && (
            <Button  color="gray.500" mr={3}
                     colorScheme='gray'
                     onClick={cancelEditing}
            >Cancel</Button>
        )} </>
    </ModalFooter> )
}