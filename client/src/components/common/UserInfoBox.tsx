import {Box} from "@chakra-ui/react";
import {ReactNode} from "react";

interface Props {
    children: ReactNode;
}

export const UserInfoBoxItem = ({children}: Props) => {
    return (
        <Box
            px={{base: "80px", md:"200px", lg: "350px"}}
            py={3} borderRadius="5px"
            bg="pink.200"
            color="white">{children}</Box>
    )
}