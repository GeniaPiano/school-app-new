import {FC, useContext} from "react";
import {ReactNode} from "react";
import {Flex} from "@chakra-ui/react";
import {Sidebar} from "../components/sidebar/Sidebar";
import {NavSizeContext} from "../providers/NavSizeProvider";
import {SidebarLink} from "../types/sidebarLink";
import {UserInfoHeader} from "../components/UserInfoHeader/UserInfoHeader";
import {useAuth} from "../hooks/useAuth";


interface Props {
    children: ReactNode;
    data: SidebarLink[];
}
export const MainLayout: FC<Props> = ({children, data}) => {

    const {navSize} = useContext(NavSizeContext);
    const {user} = useAuth()



    return (
        <Flex>
            <Sidebar data={data}/>
             <Flex flexDir="column" width="95%" >
               <UserInfoHeader/>


               <Flex alignItems="center"
                     justifyContent="center"
                     width="100%"
                     ml={{  base: navSize === "large" ? "11.5em" : "7em",
                         md: navSize === "large" ? "16em" : "8em"}}>

                   {children}
               </Flex>
           </Flex>

        </Flex>
    )
}