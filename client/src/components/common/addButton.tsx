import {Button} from "@chakra-ui/react";

interface Props {
    text: string;
    onOpen: () => void;
}

export const AddButton = ({text, onOpen} : Props) =>
    <Button
        onClick={onOpen}
        padding={{base: "2em", md: "2em"}}
        borderWidth="2px"
        borderColor="brand.500"
        variant='outline'
        color="brand.800"
        _hover={{bg: "gray.100"}}
        whiteSpace="wrap">
        {text}
    </Button>
