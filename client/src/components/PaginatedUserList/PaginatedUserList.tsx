import { useState } from 'react';
import {StudentsListItem} from "../students/StudentsListItem";
import {Button, ButtonGroup, List} from "@chakra-ui/react";
import {TeacherListItem} from "../teachers/TeacherListItem";


export const PaginatedUserList = ({ data, itemsPerPage, mainList, courseName, user, teacher }) => {
    const [currentPage, setCurrentPage] = useState(1);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = data.slice(startIndex, endIndex);

    const totalPages = Math.ceil(data.length / itemsPerPage);

    const changePage = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    return (
        <div>
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

            <List>
                {user === 'student' && currentData.map((student) => (
                    <StudentsListItem
                        key={student.student.id}
                        studentData={student}
                        studentId={student.student.id}
                        mainList={mainList}
                        courseName={student.courseName? courseName : ''}
                    />
                )) }

                {user === 'teacher' && currentData.map((oneTeacher) => <TeacherListItem key={oneTeacher.id}  teacher={teacher}/> )}

            </List>

        </div>
    );
};

