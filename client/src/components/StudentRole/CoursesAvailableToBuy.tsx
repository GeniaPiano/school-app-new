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
import {SHOP_URL} from "../../../config/api";
import axios from "axios";
// import {loadStripe} from '@stripe/stripe-js';



interface Props {
    coursesAvailable: CourseEntity[];
}
export const CoursesAvailableToBuy = ({coursesAvailable} :Props) => {

    //const stripePromise = loadStripe(process.env.VITE_STRIPE_KEY)

    const formatPrice = new Intl.NumberFormat('pl-PL', {
        style: 'currency',
        currency: 'PLN',
        minimumFractionDigits: 2,
    })

    const handleOrder = async(id: string) => {
        console.log("id product:", id);
        const stripeRes = await axios(`${SHOP_URL}/order`);
        const data = await stripeRes.data;
        console.log(data);
    }


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
                                <Button
                                mb={5}
                                size="sm"
                                onClick={()=>handleOrder(course.id)}
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