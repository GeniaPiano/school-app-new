import {Text} from '@chakra-ui/react'

interface Props {
    text: string;
}

export const ErrorText = (props: Props) => (
    <Text color="red"  mb='5px' size='xs'> {props.text} </Text>
    )
