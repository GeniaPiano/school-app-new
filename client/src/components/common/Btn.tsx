import {Button} from "@chakra-ui/react";
interface Props {
    text: string;
    type: 'submit' | 'button';
    handleClick: ()=> void;
    colorScheme: string;


}

export const Btn = ({text, type, handleClick, colorScheme}: Props) =>  (
    <Button type={type} mb={35}  onClick={handleClick && handleClick} colorScheme={colorScheme} >
        {text}
    </Button>
)