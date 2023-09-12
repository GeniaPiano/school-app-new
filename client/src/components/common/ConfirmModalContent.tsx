import {ModalBody, ModalCloseButton} from "@chakra-ui/react";

import {ConfirmTextAndIcon} from "./ConfirmTextAndIcon";

interface Props {
    text: string
    onClose: ()=> void;
}


export const ConfirmModalContent = ({text, onClose}: Props) => {
    return (
        <ModalBody>
            <ModalCloseButton onClick={onClose}/>
            <ConfirmTextAndIcon  text={text}/>
        </ModalBody>
    )
}
