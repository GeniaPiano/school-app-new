import { useState, createContext, useContext, ReactNode, FC} from 'react';

interface FormStateType {
    isEditing: boolean;
    isConfirmationOpen: boolean;
    changeIsEditing: (bool: boolean)=> void;
    openConfirmation: () => void;
    closeConfirmation: () => void;
    handleGoBackToEdit: () => void;
    handleCloseAfterConfirm: () => void;
    handleCloseConfirmModal: () => void;

}

export const FormStateContext = createContext<FormStateType | undefined>( undefined )
interface FormStateProviderProps {
    children: ReactNode;
}

export const FormStateProvider: FC<FormStateProviderProps>  = ({children}) => {
   const [isEditing, setIsEditing] = useState<boolean>(false)
   const changeIsEditing = (bool: boolean) => setIsEditing(bool)

   const [isConfirmationOpen, setIsConfirmationOpen] = useState<boolean>(false)
   const closeConfirmation = () => {
       setIsConfirmationOpen(false)
   }

   const openConfirmation = () => {
       setIsConfirmationOpen(true)
   }

    const handleGoBackToEdit = () => {
       setIsConfirmationOpen(false)
    }

    const handleCloseAfterConfirm =  () => {
       return
   }

    const handleCloseConfirmModal = () => {
        setIsConfirmationOpen(false)
        setIsEditing(false)
    }

    return  (
        <FormStateContext.Provider
            value={{
                isEditing,
                changeIsEditing,
                isConfirmationOpen,
                handleGoBackToEdit,
                handleCloseConfirmModal,
                handleCloseAfterConfirm,
                closeConfirmation,
                openConfirmation,
        }}>
            {children}
        </FormStateContext.Provider>
    )
}


export const useFormState = (): FormStateType =>  {
    const context = useContext(FormStateContext);
    if (context === undefined) {
        throw new Error("useFormState must be used within a useFormStateProvider");
    }
    return context;
}





