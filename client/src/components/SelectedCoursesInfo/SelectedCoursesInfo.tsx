import {Flex, GridItem, SimpleGrid, Text} from "@chakra-ui/react";
import {CourseFormDiv} from "../common/CourseFormDiv";
import {CourseEntity} from "../../types/course";

interface Props {
    data: CourseEntity[]
}

export const SelectedCoursesInfo = ({data}: Props) => {
    return (
        <Flex flexDir="column"   mb={4} mt={2}> {data.length > 0
                ? (
                    <SimpleGrid  columns={3}
                                 spacing={4}
                                 color="gray.500" >
                        <> { data.map(course =>
                            <CourseFormDiv key={course.id} as={GridItem} >
                                <Flex
                                    p={2}
                                    justifyContent="center"
                                    alignItems="center"
                                    borderRadius="8px"
                                    textAlign="center"
                                >
                                    {course.name}</Flex>
                            </CourseFormDiv> )
                        } </>
                    </SimpleGrid>
                )
                : <Text color="gray.500">no selected courses.</Text>

        } </Flex>
    )
}
