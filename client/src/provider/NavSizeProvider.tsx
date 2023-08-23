import {createContext, useState} from "react";

type NavSize = "large" | "small"

interface NavSizeContentType {
    navSize: NavSize,
    changeNavSize: (size: NavSize) => void,
}
const defaultValue: NavSizeContentType = {
    navSize: "small",
    changeNavSize: () => {
        console.log("default change size")},
}

export const NavSizeContext = createContext(defaultValue);

export const NavSizeProvider = ({children}) => {
    const [navSize, setNavSize] = useState<"large" | "small">("small")
    const changeNavSize = (size: NavSize) => {
        setNavSize(size)
        console.log("change nav size")
    }

    return (
        <NavSizeContext.Provider value={{navSize, changeNavSize}}>
            {children}
        </NavSizeContext.Provider>
    )
}