import {Button, Divider, Flex, HStack, Text} from "@chakra-ui/react";
import {ChangeColorModeBtn} from "../ChangeColorModeBtn/ChangeColorModeBtn";
import {Cart} from "../Cart/Cart";
import {useAuth} from "../../hooks/useAuth";
import {useCart} from "../../hooks/useCart";
import {BsFillCartFill} from "react-icons/bs";

interface Props {
    handleSignOut: () => void;
}
export const StudentInfoHeader = ({handleSignOut}:Props) => {
    const {user} = useAuth();
    const cart = useCart();
    const totalCountProducts = cart.productsCount
    return (
        <Flex alignContent="flex-end" color="gray.500">
            <Divider/>
            <Flex mt={4} alignItems="center" gap="5px">
                <Flex flexDir="column" justifyItems="flex-end" >
                    <HStack>
                        <ChangeColorModeBtn/>
                        <Button onClick={handleSignOut}
                                m={0} variant="ghost"
                                fontWeight="600"
                                color="gray.500"
                                fontSize="12px"
                                size="xs" >
                            logout</Button>
                        <Text  ml={5} color="myPink.600" fontSize="12px" fontWeight="500"> {"email" in user ? user.email :''}</Text>
                    </HStack>
                            {/*cart icon */}
                         <Button
                             mt={2}
                             onClick={cart.onOpenCart}
                             porition="relative"
                             color='myPink.500'>
                             <HStack>
                                 <Text fontSize="10px" >products <br/>in cart: {totalCountProducts} </Text>
                                 <BsFillCartFill fontSize='25px'

                                                   />
                             </HStack>
                         </Button>

                 </Flex>

            </Flex>
            <Cart/>
        </Flex>
    )
}