import {createContext, FC, ReactNode, useContext, useState} from "react";

interface CourseContextType {
    isEditing: boolean;
    changeIsEditing: (bool: boolean) => void
    courseId: string | null;
    isOpen:boolean;
    openModal: (courseId: string) => void
    closeModal: () => void
    isPosted: boolean;
    changeIsPosted: (bool: boolean) => void;
}
export const CourseContext = createContext<CourseContextType | undefined>(undefined)

interface CourseProviderProps {
    children: ReactNode;
}

export const CourseInfoProvider: FC<CourseProviderProps> = ({children}) => {
    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [isPosted, setIsPosted] = useState<boolean>(false)
    const changeIsEditing = (bool: boolean) => setIsEditing(bool)
    const [isOpen, setIsOpen] = useState(false);
    const [courseId, setCourseId] = useState<string | null>(null);

    const changeIsPosted = (bool: boolean) => setIsPosted(false)

    const openModal = (courseId: string) => {
        setCourseId(courseId);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setCourseId(null);
        setIsEditing(false)
    };


    return <CourseContext.Provider
        value={{
            isEditing,
            isPosted,
            changeIsPosted,
            changeIsEditing,
            isOpen,
            openModal,
            closeModal,
            courseId,

        }}
    >
        {children}
    </CourseContext.Provider>
}

export const useCourseInfo = (): CourseContextType => {
    const context = useContext(CourseContext);
    if (context === undefined) {
        throw new Error("useCourseInfo must be used within a PostingDataProvider");
    }
    return context;
};