import {FC, useContext} from "react";
import {ReactNode} from "react";
import {Flex} from "@chakra-ui/react";
import {Sidebar} from "../components/sidebar/Sidebar";
import {NavSizeContext} from "../providers/NavSizeProvider";
import {SidebarLink} from "../types/sidebarLink";


interface Props {
    children: ReactNode;
    data: SidebarLink[];
}
export const MainLayout: FC<Props> = ({children, data}) => {

    const {navSize} = useContext(NavSizeContext)


    return (
        <Flex>
            <Sidebar data={data}/>
            <Flex alignItems="center"
                  justifyContent="center"
                  width="100%"
                  ml={{  base: navSize === "large" ? "11.5em" : "7em",
                      md: navSize === "large" ? "16em" : "8em"}}>

                {children}
            </Flex>
        </Flex>
    )
}