import {Flex} from "@chakra-ui/react";
import {FC, ReactNode} from "react";


interface Props {
    children: ReactNode;
    onOpen: ()=> void;
  }

export const UserItem: FC<Props>  = ({children}) => {

    return (
        <Flex justifyContent="space-between"
              alignItems="center"
              gap='15px'
              pr={10}

              cursor="pointer"
              my={2} >

            {children}

        </Flex>
    )
}

