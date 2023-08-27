import {Button} from "@chakra-ui/react";

interface Props {
    text: string;
    onOpen: () => void;
}

export const AddButton = ({text, onOpen} : Props) =>
    <Button
        onClick={onOpen}
        variant='outline'
        color="brand.800"
        _hover={{bg: "gray.100"}}
        whiteSpace="wrap">
        {text}
    </Button>
