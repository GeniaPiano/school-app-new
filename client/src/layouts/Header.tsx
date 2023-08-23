import {Heading, HStack, Icon} from "@chakra-ui/react";
import {AddIcon} from "@chakra-ui/icons";


interface Props {
    onOpen?: ()=> void;
    title: string;
}
export const Header = (props: Props) => {
    const {onOpen, title} = props
    return (
        <HStack gap="20px">
            <Heading color="gray.500" m="20px 0 30px" fontWeight="400" fontSize="xx-large" as="h1"> {title} </Heading>
            <>{onOpen &&
                <Icon as={AddIcon}
                      boxSize={6}
                      cursor="pointer"
                      onClick={onOpen}
                      _hover={{color: "brand.800"}}
                />} </>
        </HStack>
    )
}