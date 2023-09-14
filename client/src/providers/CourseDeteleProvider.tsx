import {createContext, FC, ReactNode, useContext, useState} from "react";

interface CourseDeleteContextType {
    courseId: string | null;
    isOpen:boolean;
    openModal: (courseId: string) => void
    closeModal: () => void
    isPosted: boolean;
    changeIsPosted: (bool: boolean) => void;
    isConfirmed: boolean;
    toggleIsConfirmed: ()=> void;
    openEditModal: (courseId: string) => void;
}
export const CourseDeleteContext = createContext<CourseDeleteContextType | undefined>(undefined)

interface CourseProviderProps {
    children: ReactNode;
}

export const CourseDeleteProvider: FC<CourseProviderProps> = ({children}) => {
    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [isPosted, setIsPosted] = useState<boolean>(false)
    const [isConfirmed, setIsConfirmed] = useState<boolean>(false)
    const changeIsEditing = (bool: boolean) => setIsEditing(bool)
    const [isOpen, setIsOpen] = useState(false);
    const [courseId, setCourseId] = useState<string | null>(null);

    const changeIsPosted = (bool: boolean) => setIsPosted(bool)
    const toggleIsConfirmed = () => setIsConfirmed(prev=> !prev)
    const openModal = (courseId: string) => {
        setCourseId(courseId);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setCourseId(null);
        setIsEditing(false)
    };
    const openEditModal = (courseId: string) => {
        openModal(courseId);
        changeIsEditing(true)
    }



    return <CourseDeleteContext.Provider
        value={{
            isEditing,
            isPosted,
            changeIsPosted,
            changeIsEditing,
            isOpen,
            openModal,
            closeModal,
            courseId,
            isConfirmed,
            toggleIsConfirmed,
            openEditModal,


        }}
    >
        {children}
    </CourseDeleteContext.Provider>
}

export const useCourseDelete = (): CourseDeleteContextType => {
    const context = useContext(CourseDeleteContext);
    if (context === undefined) {
        throw new Error("useCourseDelete must be used within a PostingDataProvider");
    }
    return context;
};