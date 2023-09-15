import {Button} from "@chakra-ui/react";
import {useContext} from "react";
import {NavSizeContext} from "../../providers/NavSizeProvider";

interface Props {
    text: string;
    onOpen: () => void;
}

export const AddButton = ({text, onOpen} : Props) => {

    const {navSize} = useContext(NavSizeContext)
    return (
        <Button
            onClick={onOpen}
            padding={{base: "2em 1em ", md: "2em"}}
            width={navSize === "large"?  {base: "60%", md: "100%"} : {base: "90%", md: "100%"}}
            borderWidth="2px"
            borderColor="brand.500"
            variant='outline'
            color="brand.800"
            _hover={{bg: "gray.100"}}
            whiteSpace="wrap">
            {text}
        </Button>
        )
   }
