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
    isConfirmed: boolean;
    toggleIsConfirmed: ()=> void;
    openEditModal: (courseId: string) => void;
    isDelete: boolean;
    changeIsDelete: (bool: boolean) => void;
    openDeleteModal: (courseId: string) => void;
    confirmClose: boolean;
    changeConfirmClose: (bool: boolean) => void;
    isLoadingEvent: boolean;
    changeIsLoadingEvent: (bool: boolean) => void;
    isPostedEvent: boolean;
    changeIsPostedEvent: (bool: boolean) => void;
}

export const CourseContext = createContext<CourseContextType | undefined>(undefined)

interface CourseProviderProps {
    children: ReactNode;
}

export const CourseInfoProvider: FC<CourseProviderProps> = ({children}) => {
    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [isPosted, setIsPosted] = useState<boolean>(false)
    const [isConfirmed, setIsConfirmed] = useState<boolean>(false)
    const changeIsEditing = (bool: boolean) => setIsEditing(bool)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [courseId, setCourseId] = useState<string | null>(null);
    const [isDelete, setIsDelete] = useState<boolean>(false);
    const changeIsDelete = (bool: boolean) =>  setIsDelete(bool)
    const [confirmClose, setConfirmClose] = useState<boolean>(false);
    const changeConfirmClose = (bool: boolean) => setConfirmClose(bool)
    const [isLoadingEvent, setIsLoadingEvent] = useState(false);
    const changeIsLoadingEvent = (bool: boolean) => setIsLoadingEvent(bool)
    const [isPostedEvent, setIsPostedEvent] = useState(false);
    const changeIsPostedEvent = (bool: boolean) => setIsPostedEvent(bool)

    const changeIsPosted = (bool: boolean) => setIsPosted(bool)
    const toggleIsConfirmed = () => setIsConfirmed(prev=> !prev)
    const openModal = (courseId: string) => {
        setCourseId(courseId);
        setIsModalOpen(true);
        changeIsDelete(false)
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCourseId(null);
        setIsEditing(false);
        setIsConfirmed(false);
        changeIsDelete(false)
        setIsPosted(false)
    };
    const openEditModal = (courseId: string) => {
        openModal(courseId);
        changeIsEditing(true)
    }
    const openDeleteModal = (courseId: string) => {
        openModal(courseId)
        changeIsDelete(true)
    }



    return <CourseContext.Provider
        value={{
            isEditing,
            isPosted,
            changeIsPosted,
            changeIsEditing,
            isOpen: isModalOpen,
            openModal,
            closeModal,
            courseId,
            isConfirmed,
            toggleIsConfirmed,
            openEditModal,
            isDelete,
            changeIsDelete,
            openDeleteModal,
            confirmClose,
            changeConfirmClose,
            isLoadingEvent,
            changeIsLoadingEvent,
            isPostedEvent,
            changeIsPostedEvent
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