import {Button} from "@chakra-ui/react";
interface Props {
    text: string;
    tyoe: string;
}

export const Btn = ({text, type}) => <Button type={type} mb={35} color="gray.500"> {text}</Button>