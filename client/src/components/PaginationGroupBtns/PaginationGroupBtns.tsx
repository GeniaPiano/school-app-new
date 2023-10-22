import {Button, ButtonGroup} from "@chakra-ui/react";
import {CourseEntity} from "../../types/course";
import {StudentEntity} from "../../types/student";

interface Props {
   data: CourseEntity[] | StudentEntity[];
   itemsPerPage: number;
   currentPage: number;
   setCurrentPage: (page: number) => void;
}


export const PaginationGroupBtns = ({itemsPerPage, data, currentPage, setCurrentPage}: Props) => {

    const totalPages = Math.ceil(data.length / itemsPerPage);
    const changePage = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };
    return (
        <ButtonGroup mb={10}>
            <Button size="sm" onClick={() => changePage(currentPage - 1)}>Previous</Button>
            {Array.from({ length: totalPages }, (_, index) => (
                <Button size="sm"
                        colorScheme={index + 1 === currentPage ? 'teal' : 'gray'}
                        key={index}
                        onClick={() => changePage(index + 1)}>
                    {index + 1}
                </Button>
            ))}
            <Button size="sm"  onClick={() => changePage(currentPage + 1)}>Next</Button>
        </ButtonGroup>
    )
}