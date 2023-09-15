import {Badge, ModalHeader} from "@chakra-ui/react";
import {firstLetterToUpper} from "../../utils/firstLetterToUpper";

interface Props {
    title: string | undefined;
}

export const HeaderCourseInfo = ({title}: Props) => (
    <ModalHeader mb={8} color="teal">
        <Badge colorScheme="teal" mr={3}  fontSize='0.8em'>course</Badge>
        {firstLetterToUpper(title ? title : '')}
    </ModalHeader>
)