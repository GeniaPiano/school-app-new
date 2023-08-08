import {FC} from "react";
import {ReactNode} from "react";
import {Sidebar} from "../../components/SideBar/SideBar";
import {Flex} from "@chakra-ui/react";

interface Props {
    children: ReactNode;
}
export const AdminLayout: FC<Props> = ({children}) => {
    return (
        <Flex >
            <Sidebar/>
            <Flex>
                {children}
            </Flex>

        </Flex>
    )
}