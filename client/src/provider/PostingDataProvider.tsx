import { createContext, useContext, useState, ReactNode } from "react";

interface PostingDataContextType {
    isPostedData: boolean;
    changeIsPostedData: (bool: boolean) => void;
    isLoadingData: boolean;
    changeIsLoadingData: (bool: boolean) => void;
}

const PostingDataContext = createContext<PostingDataContextType | undefined>(undefined);

interface PostingDataProviderProps {
    children: ReactNode;
}

export const PostingDataProvider = ({ children }: PostingDataProviderProps) => {
    const [isPostedData, setIsPostedData] = useState<boolean>(false);
    const [isLoadingData, setIsLoadingData] = useState<boolean>(false);

    const changeIsPostedData = (bool: boolean) => {
        setIsPostedData(bool);
    };

    const changeIsLoadingData =(bool: boolean) => {
        setIsLoadingData(bool);
    }

    return (
        <PostingDataContext.Provider
            value={{
                isPostedData,
                changeIsPostedData,
                isLoadingData,
                changeIsLoadingData,
        }}>
            {children}
        </PostingDataContext.Provider>
    );
};

export const usePostingData = (): PostingDataContextType => {
    const context = useContext(PostingDataContext);
    if (context === undefined) {
        throw new Error("usePostingData must be used within a PostingDataProvider");
    }
    return context;
};
