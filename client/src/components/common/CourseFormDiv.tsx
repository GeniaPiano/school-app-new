import {Box} from "@chakra-ui/react";
import {ReactNode} from "react";
interface Props {
    children: ReactNode;
}

export const CourseFormDiv = ({children}: Props) => {
    return (
        <Box
                  bg="brand.800"
                  alignItems="center"
                  border="solid 1px"
                  borderRadius="8px"
                  color="white">

            {children}

        </Box>
    )
}