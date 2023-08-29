import React, {useCallback, useState, createContext, useContext, ReactNode} from 'react';

interface ErrorContextType {
    error: string | null;
    dispatchError: (message: string) => void;
}

export const ErrorContext = createContext<ErrorContextType | undefined>(undefined)
interface ErrorProviderProps {
    children: ReactNode;
}

export const ErrorProvider: React.FC<ErrorProviderProps>  = ({children}) => {
    const [error, setError] = useState <string | null>(null);

    const dispatchError = useCallback((message) =>  {
        setError(message);
        setTimeout(() => {
            setError('')
        }, 6000)
    }, [])


    return  (
        <ErrorContext.Provider value={{error, dispatchError}}>
            {children}
        </ErrorContext.Provider>
    )
}


export const useError = () => useContext(ErrorContext);






