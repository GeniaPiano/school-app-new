import {Flex, GridItem, Heading, SimpleGrid} from "@chakra-ui/react";

export const StudentSelectedCourses = ({selectedCourses}) => {

    return (
        <>
            <Flex flexDir="column"
                  my={4}>
                <Heading as="h3" size="sm" fontWeight="500" mb={5}>courses:</Heading>
                <SimpleGrid  columns={3}
                             spacing={4}
                             color="gray.500" >
                    <>{selectedCourses.map(course =>
                        <GridItem
                            key={course.id}
                            bg="brand.800"
                            border="solid 1px"
                            borderRadius="8px"
                            color="white"
                        >
                            <Flex
                                p={2}
                                justifyContent="center"
                                alignItems="center"
                                borderRadius="8px"
                                textAlign="center"
                            >
                                {course.name}</Flex>
                        </GridItem> )} </>
                </SimpleGrid>
            </Flex>
        </>
    )
}