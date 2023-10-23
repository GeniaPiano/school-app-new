import {
    GridItem,
    SimpleGrid,

} from "@chakra-ui/react";
import {CourseAllDetails} from "../../types/course";
import {CourseCard} from "./CourseCard";

interface Props {
    coursesAvailable: CourseAllDetails[];
}
export const CoursesStore = ({coursesAvailable} :Props) => {

    return (
        <SimpleGrid  columns={{base: 1, md: 2, lg: 4}} spacing={4} my={5} gap={3}>
            {coursesAvailable.length > 0 && coursesAvailable.map((course)=> (
              <GridItem key={course.id}  >
                    <CourseCard course={course} />
              </GridItem>
                ))}
        </SimpleGrid>
    )
}