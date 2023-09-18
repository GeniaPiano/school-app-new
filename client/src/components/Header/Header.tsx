import {Flex, Heading, HStack} from "@chakra-ui/react";
import {AddButton} from "../common/AddButton";

interface Props {
    title: string;
    buttonText: string;
    onOpen: () => void;
}

export const Header = ({title, buttonText, onOpen}: Props) => {


    return (
        <HStack w="95%"
              mb={1}
              gap={5}
              flexDirection={{base: 'column', md: 'row'}}
        >
            <Heading
                color="gray.500"
                // m={{base:"20px 30px 10px 0"}}
                fontWeight="400"
                fontSize="2rem"
                as="h1">
                {title}
            </Heading>
            <AddButton  text={buttonText} onOpen={onOpen}/>
        </HStack>
    )
}


