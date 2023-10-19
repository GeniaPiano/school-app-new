import {Loader} from "../common/Loader";
import {ModalBody} from "@chakra-ui/react";

export const ModalPosting = () => {
    return (
        <ModalBody p="60px 30px">
            <Loader colorScheme="red" loadingText='posting...' />
        </ModalBody>
    )
}