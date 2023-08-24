import {Heading} from "@chakra-ui/react";



interface Props {
    title: string;
}
export const Header = (props: Props) => {
    const {title} = props
    return (
            <Heading color="gray.500" m="20px 0 30px" fontWeight="400" fontSize="xx-large" as="h1"> {title} </Heading>
           )
}