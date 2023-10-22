import {HStack} from "@chakra-ui/react";
import {AiFillStar} from "react-icons/ai";
interface Props {
    average: number | string;
}

export const StarsRateAverage = ({average}:Props) => {

    const createArray = (length) => {
      const array = []
      for (let i = 1; i <= length; i++) {
            array.push(i);
        }
      return array
    }

    const numberOfColored = Math.floor(average)
    const numberOfUnColored = 5 - numberOfColored
    const colored = createArray(numberOfColored)
    const unColored = createArray(numberOfUnColored)

    if (!average || average === '0/0') return  (
        <HStack>
            <AiFillStar style={{color: '#CCCCCC'}}/>
            <AiFillStar style={{color: '#CCCCCC'}}/>
            <AiFillStar style={{color: '#CCCCCC'}}/>
            <AiFillStar style={{color: '#CCCCCC'}}/>
            <AiFillStar style={{color: '#CCCCCC'}}/>
        </HStack>
    )

     return (
         <HStack>
             {colored.map(one => <AiFillStar key={one} style={{color: 'teal'}} />)}
             {unColored.map(one => <AiFillStar key={one} style={{color: '#CCCCCC'}}/>)}
         </HStack>
     )
}