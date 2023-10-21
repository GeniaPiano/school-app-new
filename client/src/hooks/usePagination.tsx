import {useState} from "react";
import {CourseAllDetails} from "../types/course";


export const usePagination = (itemsPerPage: number, data: CourseAllDetails[]) => {
    const [currentPage, setCurrentPage] = useState(1);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = data.slice(startIndex, endIndex);

    return {
        currentPage,
        setCurrentPage,
        currentData,
    }


}