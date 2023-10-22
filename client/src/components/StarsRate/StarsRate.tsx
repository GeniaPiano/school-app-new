import {HStack} from "@chakra-ui/react";
import {AiFillStar} from "react-icons/ai";

interface Props {
    stars: number;
}
export const StarsRate = ({stars} :Props) => {
    const createArray = () => {
        const array = []
        for (let i = 1; i <= stars; i++) {
            array.push(i);
        }
        return array
    }
    const numberOfStars = createArray()


    return (
        <HStack>
            {numberOfStars.map(star => (
                <HStack key={star}>
                    <AiFillStar color="orange"/>
                </HStack>
            ))}

        </HStack>
    )
}