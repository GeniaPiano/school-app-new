import { Image, TableCaption, Tbody, Td, Th, Thead, Tr, Text} from "@chakra-ui/react";
import {CourseAllDetails} from "../../types/course";
import {PaginationGroupBtns} from "../PaginationGroupBtns/PaginationGroupBtns";
import {usePagination} from "../../hooks/usePagination";
import {averageRateCourse} from "../../utils/averageRateCourse";
import {StarsRate} from "../StarsRate/StarsRate";

interface Props {
    data: CourseAllDetails[];
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
                        <Th display={{base: 'none', md: 'table-cell'}} >teacher</Th>
                        <Th display={{base: 'none', md: 'table-cell'}}  isNumeric>rate</Th>
                        <Th display={{base: 'none', md: 'table-cell'}}  isNumeric></Th>
                        <Th display={{base: 'none', md: 'table-cell'}}  isNumeric> nr students</Th>
                        <Th display={{base: 'none', md: 'table-cell'}} isNumeric>price</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {currentData && currentData.map((course) => (
                        <Tr key={course.id}  cursor="pointer">
                            <Td> <Text fontWeight="600" color="teal.500">{course.name}</Text></Td>
                            <Td> <Image src={course.photoUrl} width='40px' borderRadius='20px'/> </Td>
                            <Td display={{base: 'none', md: 'table-cell'}}>{course.teacherName !== null ? course.teacherName : <Text as='i' color="orange"> not assigned </Text>}</Td>
                            <Td display={{base: 'none', md: 'table-cell'}} isNumeric>
                                 {course.rates.length !== 0 ? `${averageRateCourse(course.rates).toFixed(2)}/${course.rates.length}` : '0/0' }</Td>
                            <Td> <StarsRate average={averageRateCourse(course.rates)}/> </Td>
                            <Td display={{base: 'none', md: 'table-cell'}} isNumeric> {course.countStudents} </Td>
                            <Td display={{base: 'none', md: 'table-cell'}} isNumeric>{course.price.toFixed(2)} PLN</Td>
                        </Tr>
                    ))}
                </Tbody>

        </>
    )
};

