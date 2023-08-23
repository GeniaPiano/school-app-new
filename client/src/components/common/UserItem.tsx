import {Flex, Text} from "@chakra-ui/react";
import {FC, ReactNode} from "react";

interface Props {
    children: ReactNode;
    onOpen: ()=> void

  }


export const UserItem: FC<Props>  = ({children, onOpen}) => {
    return (
        <Flex justifyContent="space-between"
              _hover={{color: "brand.700"}}
              cursor="pointer"
              my={2}
              onClick={onOpen}
              >

            {children}
        </Flex>
    )
}