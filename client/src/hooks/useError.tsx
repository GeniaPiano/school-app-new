import { useCallback, useState } from 'react';

export const useError = () => {
    const [error, setError] = useState <string | null>(null);

    const dispatchError = useCallback((message: string) =>  {
        setError(message);
        setTimeout(() => {
            setError(null)
        }, 6000)
    }, [])

    return {
        error,
        dispatchError,
    }

}



// export const ErrorContext = createContext({})
//
// export const ErrorProvider = ({children}) => {
//     const [error, setError] = useState <string | null>(null);
//
//     const dispatchError = useCallback((message) =>  {
//         setError(message);
//         setTimeout(() => {
//             setError('')
//         }, 6000)
//     }, [])
//
//
//     return  (
//         <ErrorContext.Provider value={{error, dispatchError}}>
//             {children}
//         </ErrorContext.Provider>
//     )
// }
//
// export const useError = () => {
//     const errorContext = useContext(ErrorContext);
//
//     if (!errorContext) {
//         throw Error ('useError needs to be used inside ErrorContext')
//     }
//
//     return errorContext
// }