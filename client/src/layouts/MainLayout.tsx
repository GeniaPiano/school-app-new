import {FC, useContext} from "react";
import {ReactNode} from "react";
import {Flex,Box} from "@chakra-ui/react";
import {Sidebar} from "../components/sidebar/Sidebar";
import {NavSizeContext} from "../providers/NavSizeProvider";
import {SidebarLink} from "../types/sidebarLink";
import {UserInfoHeader} from "../components/UserInfoHeader/UserInfoHeader";

interface Props {
    children: ReactNode;
    data: SidebarLink[];
}
export const MainLayout: FC<Props> = ({children, data}) => {

    const {navSize} = useContext(NavSizeContext);
    return (
        <Flex >
            <Sidebar data={data}/>
             <Box flexDir="column" width="95%">
               <UserInfoHeader/>


               <Flex alignItems="center"
                     justifyContent="center"
                     width="85%"
                     ml={{  base: navSize === "large" ? "14em" : "9em",
                         md: navSize === "large" ? "16em" : "8em"}}
                   >
                   {children}
               </Flex>
           </Box>

        </Flex>
    )
}