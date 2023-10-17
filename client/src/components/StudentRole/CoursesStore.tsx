import {
    GridItem,
    SimpleGrid,

} from "@chakra-ui/react";
import {CourseEntity} from "../../types/course";
import {SHOP_URL} from "../../../config/api";
import {loadStripe} from '@stripe/stripe-js';
import {Payment} from "../Payment/Payment";
import {CourseCard} from "./CourseCard";

interface Props {
    coursesAvailable: CourseEntity[];
}
export const CoursesStore = ({coursesAvailable} :Props) => {

    const stripePromise = loadStripe(import.meta.env.VITE_PUBLISHABLE_KEY)
    const formatPrice = new Intl.NumberFormat('pl-PL', {
        style: 'currency',
        currency: 'PLN',
        minimumFractionDigits: 1,
    })

    const handleOrder = async(id: string) => {
        const stripeRes = await fetch(`${SHOP_URL}/order`);
        const {id: sessionId} = await stripeRes.json();
        const stripe = await stripePromise;
        const { error } = await stripe.redirectToCheckout({sessionId})
        console.log(error);
        // console.log('stripe error:', error)
    }

    return (
        <SimpleGrid  columns={{base: 1, md: 2, lg: 3}} spacing={4} my={5} gap={3}>
            {coursesAvailable.length > 0 && coursesAvailable.map((course)=> (
              <GridItem key={course.id}  >
                    <CourseCard course={course} handleOrder={handleOrder}/>
              </GridItem>
                ))}
    </SimpleGrid>
    )
}