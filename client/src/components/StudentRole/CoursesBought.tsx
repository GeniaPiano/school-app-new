import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Flex,
    GridItem,
    Heading,
    SimpleGrid,
    Stack,
    Text,
    useColorModeValue
} from "@chakra-ui/react";
import {firstLetterToUpper} from "../../utils/firstLetterToUpper";
import {StarIcon} from "@chakra-ui/icons";
import {formatDate, getExpireDate} from "../../utils/date-functions";
import {CourseEntity} from "../../types/course";


interface Props {
    coursesAvailable: CourseEntity[];
}
export const CoursesBought = ({coursesChosen}: Props) => {
    const color = useColorModeValue('brand.800', 'gray.50')
    const bg = useColorModeValue('gray.50', 'gray.400')
    const bgCard = useColorModeValue('myPink.100', 'myPink.50')
    return (
        <SimpleGrid  columns={{base: 1, md: 2, lg: 3}} spacing={4} my={5} gap={3}>
            {
                coursesChosen.length > 0 && coursesChosen.map(course =>
                    <GridItem key={course.id}>
                        <Card
                            bg={bgCard}
                            key={course.id} color="gray"
                            minWidth="200px">
                            <CardHeader as={Flex} justifyContent="space-between" color="gray.600" fontWeight="500" fontSize="larger">
                                <Heading as="h3" size='s'>{firstLetterToUpper(course.name)}</Heading>
                                <Flex flexDirection="column" alignItems="flex-end">
                                    <Flex mr={2}>
                                        <StarIcon color="brand.800"/>
                                        <StarIcon color="brand.800"/>
                                        <StarIcon color="brand.800"/>
                                    </Flex>
                                    <Button mt={5}
                                            color={color}
                                            bg={bg}
                                            size="sm">leave rating</Button>
                                </Flex>
                            </CardHeader>
                            <CardBody>
                                <Stack>
                                    <Stack >
                                        <Text>bought for: {course.price.toFixed(2)} PLN</Text>
                                        <Text> started at: {formatDate(course.startedAt)}</Text>
                                        <Text color="gray.500"> expires at: {formatDate(getExpireDate(new Date(course.startedAt)))} </Text>
                                    </Stack>
                                </Stack>
                            </CardBody>
                        </Card>
                    </GridItem>)
            }
        </SimpleGrid>
    )
}
