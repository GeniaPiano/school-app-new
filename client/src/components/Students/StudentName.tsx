import { ModalHeader} from "@chakra-ui/react";


export const StudentName = ({name, last_name}) => {

    return  (
    <>
        <ModalHeader>{name} {last_name}</ModalHeader>
    </>
    )
}