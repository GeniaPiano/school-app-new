import {Flex, ModalBody, ModalCloseButton, Text} from "@chakra-ui/react";
import {CheckIcon} from "@chakra-ui/icons";
import {ConfirmTextAndIcon} from "./ConfirmTextAndIcon";

interface Props {
    text: string
    onClose: ()=> void;
}


export const ConfirmModalContent = ({text, onClose}: Props) => {
    return (
        <ModalBody>
            <ModalCloseButton onClick={onClose}/>
            <ConfirmTextAndIcon text={text}/>
        </ModalBody>
    )
}
