import {Box, SimpleGrid} from "@chakra-ui/react";
import {CourseItem} from "../common/CourseItem";
import {CourseEntity} from "../../types/course";

interface Props {
    data: CourseEntity[];
    handleRemove: (courseId: string)=> void;
}


export const ChosenCourses = ({data, handleRemove} : Props) => {

     return (
         <SimpleGrid columns={3} spacing={4} my={5}>
             {data.map(oneDataItem => (
                 <Box key={oneDataItem.id} position="relative" bg="brand.800" color="white" p={3} borderRadius="10px" alignItems="center">
                     <CourseItem name={oneDataItem.name} courseId={oneDataItem.id} handleRemove={handleRemove} />
                 </Box> ))}
         </SimpleGrid>
     )


}