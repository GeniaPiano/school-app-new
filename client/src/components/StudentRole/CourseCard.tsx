import {
    Box,
    Button,
    Card,
    CardBody,
    Flex,
    Heading,
    HStack,
    IconButton,
    Image, Stack,
    Text,
    useColorModeValue
} from "@chakra-ui/react";
import {firstLetterToUpper} from "../../utils/firstLetterToUpper";
import {StarIcon} from "@chakra-ui/icons";
import {AccordionInfo} from "../common/AccordionInfo";
import {CourseEntity} from "../../types/course";
import {HiShoppingCart} from "react-icons/hi";
import {useCart} from "../../hooks/useCart";

interface Props {
    course: CourseEntity;
}
export const CourseCard = ({course}: Props) => {
    const color = useColorModeValue('gray.600', 'gray.50')
    const bgCard = useColorModeValue('brand.400', 'gray.600')
    const bgElement = useColorModeValue('gray.100', 'gray.500')
    const hover = {bg: useColorModeValue('white', 'gray.400' )}
    const titleColor = useColorModeValue('myPink.600', 'myPink.400')

    const cart = useCart();
    const  productQuantity = cart.getProductQuantity(course.id)
    return (
        <Card bg={bgCard}
              key={course.id}
              color={color}

        >
            <CardBody>
                <Image
                        borderRadius='lg'
                        src={course.photoUrl}
                    />
                <Heading
                    my={3}
                    color={titleColor}
                    size='s'>{firstLetterToUpper(course.name)}</Heading>
                <HStack mb={5}>
                    {productQuantity > 0
                    ? <HStack>
                        <Flex>

                        </Flex>
                        <HStack>
                            <Stack>
                               <Button size="xs" onClick={()=> cart.addOneToCart(course.id)}>+</Button>
                               <Button size="xs" onClick={()=> cart.removeOneFromCart(course.id)}>-</Button>
                            </Stack>
                             <Text> in cart: {productQuantity} </Text>
                        </HStack>
                         <Button color={titleColor}
                                  fontSize="13px"
                                  onClick={()=> cart.deleteFromCart(course.id)}
                                  h={6}
                                  p={4}>Remove</Button>
                      </HStack>
                    : <><IconButton
                        onClick={()=> cart.addOneToCart(course.id)}
                        color={color}
                        bg={bgElement}
                        _hover={hover}
                        aria-label='add to cart icon' icon={<HiShoppingCart/>}/>
                            </>}
                </HStack>

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
    )
}