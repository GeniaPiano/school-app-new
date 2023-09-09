import {Button, ModalFooter} from "@chakra-ui/react";
import {SyntheticEvent} from "react";
import {useFormState} from "../../provider/FormStateProvider";

interface Props {
    handleSubmit: (e: SyntheticEvent)=>void;
    // cancelEditing: ()=> void
}

export const TeacherUpdateFooterBtns = ({handleSubmit}: Props) =>   {
    const {changeIsEditing} = useFormState();

    return  (
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
                     onClick={() => changeIsEditing(false)}
            >Cancel</Button>
        </ModalFooter>
    )


}


