import {

    List,
    Text,
    Flex,
    Modal,
    Image,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay, ListItem, ModalFooter, Divider, Button
} from "@chakra-ui/react";
import {useCart} from "../../hooks/useCart";
import {useEffect, useState} from "react";


export const Cart = () => {

    const cart = useCart();
    const [totalCost, setTotalCost] = useState<null | number>(null);

    useEffect(() => {
        (async () => {
            const cost = await cart.getTotalCost();
            setTotalCost(cost);
        })();
    }, [cart]);

    return (
        <Modal isOpen={cart.isOpenCart} onClose={cart.onCloseCart}>
            <ModalOverlay/>
                <ModalContent color="gray.600">
                    <ModalCloseButton/>
                    <ModalHeader>
                        Your Shopping Cart:
                    </ModalHeader>
                    <ModalBody>
                        {cart.productsCount > 0 ?
                            <>
                                <Text mb={3}>Courses in your cart:</Text>
                                <List>
                                    {cart.items.map(item => (
                                        <ListItem key={item.id} m={2}>
                                            <Flex gap={10} justifyItems="center" alignItems="center">
                                                <Image
                                                    height="4rem"
                                                    width="4rem"
                                                    borderRadius='5px'
                                                    src={item.url}/>
                                                <Text> {item.name} </Text>
                                                <Text> {item.quantity}
                                                    <Button onClick={()=>cart.addOneToCart(item.id)} size="xs" mx={2}>+</Button>
                                                    <Button onClick={()=>cart.removeOneFromCart(item.id)} size="xs">-</Button>
                                                </Text>
                                            </Flex>
                                            <Divider p={2}/>
                                        </ListItem>
                                    ))}
                                </List>
                                <Text mr={5} fontWeight="600" textAlign="end">Total</Text>
                                <Text mr={5} fontWeight="600" textAlign="end">{totalCost.toFixed(2)}PLN</Text>
                            </>
                            : <h1>There are no courses in you cart!</h1>
                        }

                        <ModalFooter>
                            <Button onClick={cart.onCloseCart} mr={5}>find more classes</Button>
                            <Button bg="brand.700" >purchase courses</Button>
                        </ModalFooter>
                    </ModalBody>
            </ModalContent>
        </Modal>
    )
}