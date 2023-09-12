import { createContext, useContext, useState, ReactNode } from "react";

interface PostingDataContextType {
    isPostedData: boolean;
    changeIsPostedData: (bool: boolean) => void;
    isLoadingData: boolean;
    changeIsLoadingData: (bool: boolean) => void;
    dispatchText: (txt: string) => void;
    text: string;
}

const PostingDataContext = createContext<PostingDataContextType | undefined>(undefined);

interface PostingDataProviderProps {
    children: ReactNode;
}

export const PostingDataProvider = ({ children }: PostingDataProviderProps) => {
    const [isPostedData, setIsPostedData] = useState<boolean>(false);
    const [isLoadingData, setIsLoadingData] = useState<boolean>(false);
    const [text, setText] = useState<string | null>(null)
    const dispatchText = (txt: string) => {
        setText(txt)
        setTimeout(()=> {
            setText(null)
        }, 4000)
    }

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
                text,
                dispatchText,
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
