import {

    Box,
    Button,
    Card,
    CardBody,
    CardHeader,
    Flex,
    GridItem,
    Heading,
    HStack, SimpleGrid,
    useColorModeValue
} from "@chakra-ui/react";
import {firstLetterToUpper} from "../../utils/firstLetterToUpper";
import {StarIcon} from "@chakra-ui/icons";
import {CourseEntity} from "../../types/course";
import {AccordionInfo} from "../common/AccordionInfo";

interface Props {
    coursesAvailable: CourseEntity[];
}
export const CoursesAvailableToBuy = ({coursesAvailable} :Props) => {
    const color = useColorModeValue('gray.600', 'gray.50')
    const bg = useColorModeValue('gray.50', 'gray.500')
    const hover = {bg: useColorModeValue('white', 'gray.400' )}
    return (
        <SimpleGrid  columns={{base: 1, md: 2, lg: 3}} spacing={4} my={5} gap={3}>
            {coursesAvailable.length > 0 && coursesAvailable.map((course)=> (
              <GridItem key={course.id}  >
               <Card bg="brand.400" key={course.id} color="gray" minWidth="200px">
                   <CardHeader>
                     <Heading size='s'>{firstLetterToUpper(course.name)}</Heading>
                        </CardHeader>
                             <CardBody>
                                <Button mb={5} size="sm"
                                color={color}
                                bg={bg}
                                _hover={hover}>
                                buy now
                                </Button>
                                    <HStack justifyContent="space-between" mb={5} mx={3}>
                                       <Box>
                                            {course.price.toFixed(2)} PLN
                                       </Box>
                                        <Flex>
                                            <StarIcon color="myPink.500"/>
                                            <StarIcon color="myPink.500"/>
                                            <StarIcon color="myPink.500"/>
                                        </Flex>
                                    </HStack>
                                    <AccordionInfo info={course.description}/>
                             </CardBody>
                          </Card>
                    </GridItem>
                ))}
    </SimpleGrid>
    )
}