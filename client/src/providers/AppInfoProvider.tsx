import {createContext, ReactNode, useContext, useState} from "react";

interface AppInfoContextType {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const AppInfoContext = createContext<AppInfoContextType | undefined>(undefined)

interface Props {
    children: ReactNode;
}

export const AppInfoProvider = ({children}:Props) => {

    const [isOpen, setIsOpen] = useState<boolean>(true)
    const onClose = () => setIsOpen(false)
    const onOpen = () => setIsOpen(true)

    return  (
        <AppInfoContext.Provider value={{
            isOpen, onOpen, onClose
        }}>
            {children}
        </AppInfoContext.Provider>
    )
}

export const useAppInfo = () => useContext(AppInfoContext)