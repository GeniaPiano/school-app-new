
import {StudentsListItem} from "../students/StudentsListItem";
import {Table, TableContainer, TableCaption, Tbody, Th, Thead, Tr} from "@chakra-ui/react";
import {PaginationGroupBtns} from "../PaginationGroupBtns/PaginationGroupBtns";
import {usePagination} from "../../hooks/usePagination";
import {SingleStudentRes} from "../../types/student";


interface Props {
    data: SingleStudentRes[];
    itemsPerPage: number;
    mainList: boolean;
    courseName: string;
    user: string;
}


export const PaginatedStudentList = ({ data, itemsPerPage, mainList}: Props) => {

    const {currentPage, setCurrentPage, currentData} = usePagination(itemsPerPage, data);
    return (
        <div>
            <TableContainer border='1px solid'
                            borderColor="gray.300"
                            borderRadius='md'
                            overflowX="auto"
                            whiteSpace="wrap"
            >
                <Table>
                    {data.length > 0 && (
                        <TableCaption>
                            <PaginationGroupBtns data={data} itemsPerPage={itemsPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                        </TableCaption>
                    )}
                    <Thead>
                        <Tr>
                            <Th>first name</Th>
                            <Th>last name</Th>
                            <Th>email</Th>
                            <Th>courses</Th>
                            <Th>details / edit</Th>
                            <Th>delete</Th>
                        </Tr>
                    </Thead>

                    <Tbody>
                        {currentData.map(student => (
                                <StudentsListItem key={student.student.id} studentData={student} mainList={mainList}    />
                        ))}

                    </Tbody>

                 </Table>
            </TableContainer>
           </div>
    );
};

