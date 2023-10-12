import {IconButton, useColorMode} from "@chakra-ui/react";
import {FaMoon} from "react-icons/fa";
import {BsSun} from "react-icons/bs";
interface Props {
    isDark?: boolean;
}

export const ChangeColorModeBtn = (props: Props) =>  {
    const { colorMode, toggleColorMode } = useColorMode()
    return (
        <header>
            <IconButton
                onClick={toggleColorMode}
                icon={colorMode === 'light' ? <FaMoon/> : <BsSun/> }
                size="sm"
                variant="ghost"
                color={props.isDark ? 'myPink.700' : "myPink.500"}
                            />

        </header>
    )
}