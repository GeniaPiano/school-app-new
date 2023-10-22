import {useState} from "react";
import {CourseAllDetails} from "../types/course";
import {SingleStudentRes} from "../types/student";


export const usePagination = (itemsPerPage: number, data: CourseAllDetails[] | SingleStudentRes[]) => {
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