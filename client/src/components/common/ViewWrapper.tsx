import {Flex} from "@chakra-ui/react";
import {FC, ReactNode, useContext} from "react";
import {NavSizeContext} from "../../providers/NavSizeProvider";

interface Props {
    children: ReactNode;
}

export const ViewWrapper:FC<Props> = ({children}) => {
    const {navSize} = useContext(NavSizeContext)

    return (
       <Flex
           color="gray.500"
           boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.09)"
           borderRadius='15px'
           p={5}
           mt={10}
           minWidth={{base: navSize === 'small' ? '35vh' : '40vw',
            md: '60vw',
            lg: '50vw'}}
           flexDirection="column"

       >
           {children}
       </Flex>
    )
}