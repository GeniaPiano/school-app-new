import {Box, Card, CardBody, Flex, Heading, SimpleGrid} from "@chakra-ui/react";




export const StudentCoursesView = () => {



    return (
        <Flex color="gray.500" h="95vh" mt="2.5vh" flexDir="column" mb="5em">
            <Box>
                <Heading mr={30}
                         color="gray.500"
                         m="20px 0 30px"
                         fontWeight="400"
                         fontSize="xx-large"
                         as="h1"> Courses
                </Heading>
                <SimpleGrid columns={{base: 1, md: 2, lg: 3}} spacing={4} my={5}>
                    <Card>
                        <CardBody>

                        </CardBody>
                    </Card>
                </SimpleGrid>



            </Box>
        </Flex>
    )
}