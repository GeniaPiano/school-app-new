import {FC, useContext} from "react";
import {ReactNode} from "react";
import {Flex} from "@chakra-ui/react";
import {Sidebar} from "../components/sidebar/Sidebar";
import {NavSizeContext} from "../provider/NavSizeProvider";




interface Props {
    children: ReactNode;
}
export const AdminLayout: FC<Props> = ({children}) => {

    const {navSize} = useContext(NavSizeContext)


    return (
        <Flex gap={10} >
            <Sidebar />
            <Flex alignItems="center" justifyContent="center"
                  ml={{  base: navSize === "large" ? "11em" : "6em", md: navSize === "large" ? "16em" : "8em"}}>
                {children}
            </Flex>

        </Flex>
    )
}