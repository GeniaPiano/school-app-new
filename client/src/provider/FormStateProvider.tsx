import { useState, createContext, useContext, ReactNode, FC} from 'react';

interface FormStateType {
    isEditing: boolean;
    isConfirmationOpen: boolean;
    changeIsEditing: (bool: boolean)=> void;
    openConfirmation: () => void;
    closeConfirmation: () => void;
    handleGoBackToEdit: () => void;
    handleModalCloseBtn: () => void;
    handleCloseConfirmModal: () => void;
    toggleEditing: () => void;
}

export const FormStateContext = createContext<FormStateType | undefined>( undefined )
interface FormStateProviderProps {
    children: ReactNode;
    forAdding: boolean;
}

export const FormStateProvider: FC<FormStateProviderProps>  = ({children, forAdding}) => {
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

    const toggleEditing = () => setIsEditing(!isEditing)

    const handleModalCloseBtn =  () => {
       return
   }

    const handleCloseConfirmModal = () => {
        console.log('close')
        closeConfirmation();
        setIsEditing(false)
    }

    return  (
        <FormStateContext.Provider
            value={{
                isEditing,
                changeIsEditing,
                isConfirmationOpen,
                forAdding,
                handleGoBackToEdit,
                handleCloseConfirmModal,
                handleModalCloseBtn,
                closeConfirmation,
                openConfirmation,
                toggleEditing,
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





