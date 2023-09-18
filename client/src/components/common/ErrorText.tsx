import {Text} from '@chakra-ui/react'

interface Props {
    text: string;
    color?: string;
}

export const ErrorText = ({color, text}: Props) => (
    <Text color={color? color : "red"}  mb='5px' size='xs'> {text} </Text>
    )
