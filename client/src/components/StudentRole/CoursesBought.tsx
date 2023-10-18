import {
    Button,
    Card,
    CardBody,
    Flex,
    Image,
    GridItem,
    Heading,
    SimpleGrid,
    Stack,
    Text,
    useColorModeValue, Modal, ModalOverlay, ModalHeader, ModalContent, useDisclosure, ModalCloseButton, ModalBody
} from "@chakra-ui/react";
import {firstLetterToUpper} from "../../utils/firstLetterToUpper";
import {StarIcon} from "@chakra-ui/icons";
import {formatDate, getExpireDate} from "../../utils/date-functions";
import {CourseWithStartedDate} from "../../types/course";


interface Props {
    coursesChosen: CourseWithStartedDate[];
}
export const CoursesBought = ({coursesChosen}: Props) => {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const headingColor = useColorModeValue('gray.600', 'myPink.400')
    const color = useColorModeValue('gray.500', 'gray.50')
    const bg = useColorModeValue('gray.50', 'gray.400')
    const bgCard = useColorModeValue('myPink.100', 'gray.600')

    return (
        <>
        <SimpleGrid  columns={{base: 1, md: 2, lg: 3}} spacing={4} my={5} gap={3}>
            {
                coursesChosen.length > 0 && coursesChosen.map(course =>
                    <GridItem key={course.id}>
                        <Card
                            bg={bgCard}
                            key={course.id} color="gray"
                            minWidth="200px">

                            <Heading m={4} as={Flex} justifyContent="space-between" color={headingColor}fontWeight="500" fontSize="larger">
                                <Flex flexDir="column" >
                                    <Heading as="h3" size='s'>
                                        {firstLetterToUpper(course.name)}
                                    </Heading>
                                    <Image
                                        mt={2}
                                        borderRadius='full'
                                        src={course.photoUrl}
                                        height="4rem"
                                        width="4rem"
                                    />
                                </Flex>

                                <Flex flexDirection="column" alignItems="flex-end">
                                    <Flex mr={2}>
                                        <StarIcon color="brand.800"/>
                                        <StarIcon color="brand.800"/>
                                        <StarIcon color="brand.800"/>
                                    </Flex>
                                    <Button mt={5}
                                            color={color}
                                            bg={bg}
                                            onClick={()=> onOpen()}
                                            size="sm">leave rating</Button>
                                </Flex>
                            </Heading>

                            <CardBody>
                                <Stack>
                                    <Stack color={color} >
                                        <Text>bought for: {course.price.toFixed(2)} PLN</Text>
                                        <Text> date of purchase: {formatDate(course.startedAt)}</Text>
                                        <Text> expires at: {formatDate(getExpireDate(new Date(course.startedAt)))} </Text>
                                    </Stack>
                                </Stack>
                            </CardBody>
                        </Card>
                    </GridItem>)
            }
        </SimpleGrid>
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay/>
            <ModalContent  color="gray.600">
            <ModalCloseButton/>
                <ModalHeader>
                   Leave a rate
                </ModalHeader>
                <ModalBody mb={10}>
                    Feature coming soon....
                </ModalBody>
            </ModalContent>
        </Modal>
        </>
    )
}
