import { Image, TableCaption, Tbody, Td, Th, Thead, Tr} from "@chakra-ui/react";
import {CourseEntity} from "../../types/course";
import {PaginationGroupBtns} from "../PaginationGroupBtns/PaginationGroupBtns";
import {usePagination} from "../../hooks/usePagination";

interface Props {
    data: CourseEntity[];
    itemsPerPage: number;
}

export const PaginatedCoursesListForAdmin = ({ data, itemsPerPage} : Props) => {

    const {currentPage, setCurrentPage, currentData} = usePagination(itemsPerPage, data);
    return (
        <>  <TableCaption>
                    <PaginationGroupBtns data={data} itemsPerPage={itemsPerPage} currentPage={ currentPage} setCurrentPage={setCurrentPage} />
                </TableCaption>
                <Thead>
                    <Tr>
                        <Th>course name</Th>
                        <Th>details</Th>
                        <Th display={{base: 'none', md: 'table-cell'}} >instructor</Th>
                        <Th display={{base: 'none', md: 'table-cell'}}  isNumeric>nr of students</Th>
                        <Th display={{base: 'none', md: 'table-cell'}} isNumeric>price</Th>
                        <Th display={{base: 'none', md: 'table-cell'}}  isNumeric>rate</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {currentData && currentData.map((course) => (
                        <Tr  key={course.id}
                             cursor="pointer">
                            <Td>{course.name}</Td>
                            <Td> <Image src={course.photoUrl} width='40px' borderRadius='20px'/> </Td>
                            <Td display={{base: 'none', md: 'table-cell'}}>teacher</Td>
                            <Td display={{base: 'none', md: 'table-cell'}} isNumeric>number</Td>
                            <Td display={{base: 'none', md: 'table-cell'}} isNumeric>{course.price}</Td>
                            <Td display={{base: 'none', md: 'table-cell'}} isNumeric>rate</Td>
                        </Tr>
                    ))}
                </Tbody>

        </>
    )
};

