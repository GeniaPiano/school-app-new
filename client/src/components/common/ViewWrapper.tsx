import {Flex} from "@chakra-ui/react";
import {FC, ReactNode} from "react";

interface Props {
    children: ReactNode;
}

export const ViewWrapper:FC<Props> = ({children}) => {
    return (
       <Flex
           color="gray.500"
           boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.09)"
           borderRadius='15px'
           p={5}
           mt={10}
           flexDirection="column"
           width="100%"

       >
           {children}
       </Flex>
    )
}