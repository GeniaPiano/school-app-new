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
             <Box flexDir="column" width="95%"  >
               <UserInfoHeader/>
               <Flex alignItems="center"
                     justifyContent="center"
                     width={{base: navSize === 'large' ?  '80%' : '95%',
                            md:navSize === 'large' ? '85%': '90%',
                            lg:navSize === 'large' ? '90%' : '95%'}}
                     ml={{  base: navSize === "large" ? "11em" : "6em",
                         md: navSize === "large" ? "15em" : "8em",
                         lg: navSize === "large" ? "14em" : "8em",
                     }}
                   >
                   {children}
               </Flex>
           </Box>

        </Flex>
    )
}