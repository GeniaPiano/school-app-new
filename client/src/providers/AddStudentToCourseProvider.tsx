import { createContext, useContext, useState, ReactNode } from "react";

interface AddStudentToCourseContextType {
    isPostedData: boolean;
    changeIsPostedData: (bool: boolean) => void;
    isLoadingData: boolean;
    changeIsLoadingData: (bool: boolean) => void;

}

const AddStudentToCourseContext = createContext<AddStudentToCourseContextType | undefined>(undefined);

interface AddStudentToCourseProps {
    children: ReactNode;
}

export const AddStudentToCourseProvider = ({ children }: AddStudentToCourseProps) => {
    const [isPostedData, setIsPostedData] = useState<boolean>(false);
    const [isLoadingData, setIsLoadingData] = useState<boolean>(false);



    const changeIsPostedData = (bool: boolean) => {
        setIsPostedData(bool);
    };

    const changeIsLoadingData =(bool: boolean) => {
        setIsLoadingData(bool);
    }

    return (
        <AddStudentToCourseContext.Provider
            value={{
                isPostedData,
                changeIsPostedData,
                isLoadingData,
                changeIsLoadingData}} >

            {children}
        </AddStudentToCourseContext.Provider>
    );
};

export const useAddStudentToCourse = (): AddStudentToCourseContextType  => {
    const context = useContext(AddStudentToCourseContext );
    if (context === undefined) {
        throw new Error("useAddStudentToCourse must be used within a AddStudentToCourseProvider");
    }
    return context;
};