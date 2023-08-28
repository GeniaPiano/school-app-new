import {FC, useState} from "react";
import {ReactNode} from "react";
import {Flex} from "@chakra-ui/react";
import {Sidebar} from "../components/sidebar/Sidebar";
import { createStandaloneToast } from '@chakra-ui/react'

const { ToastContainer } = createStandaloneToast();

interface Props {
    children: ReactNode;
}
export const AdminLayout: FC<Props> = ({children}) => {
    const [isHoverLink, setIsHoverLink] = useState(false)


    const changeHoverLink = (bool:boolean): void => {
        setIsHoverLink(bool);
    }


    return (
        <Flex gap={10}>
            <Sidebar isHoverLink={isHoverLink} changeHoverLink={changeHoverLink}/>
            <Flex >
                {children}
            </Flex>
            <ToastContainer/>
        </Flex>
    )
}