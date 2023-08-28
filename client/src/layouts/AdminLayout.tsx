import {FC, useContext, useState} from "react";
import {ReactNode} from "react";
import {Flex} from "@chakra-ui/react";
import {Sidebar} from "../components/Sidebar/Sidebar";
import {NavSizeContext} from "../provider/NavSizeProvider";

interface Props {
    children: ReactNode;
}
export const AdminLayout: FC<Props> = ({children}) => {
    const [isHoverLink, setIsHoverLink] = useState(false)
    const {navSize} = useContext(NavSizeContext)

    const changeHoverLink = (bool:boolean): void => {
        setIsHoverLink(bool);
    }



    return (
        <Flex gap={10}>
            <Sidebar isHoverLink={isHoverLink} changeHoverLink={changeHoverLink}/>
            <Flex >
                {children}
            </Flex>
        </Flex>
    )
}