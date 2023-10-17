import {List, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay} from "@chakra-ui/react";
import {useCart} from "../../hooks/useCart";


export const Cart = () => {

    const cart = useCart();


    return (
        <Modal isOpen={cart.isOpenCart} onClose={cart.onCloseCart}>
            <ModalOverlay/>
                <ModalContent>
                    <ModalCloseButton/>
                    <ModalHeader>
                        Your Shopping Cart:
                    </ModalHeader>
                    <ModalBody>
                        {cart.productsCount > 0 ?
                            <>
                              <p>Courses in your cart:</p>
                               <List>
                                   {cart.items.map(item => (
                                       <h1 key={item.id}>  </h1>

                                   ))}
                               </List>
                            </>
                        : <h1>There are no courses in you cart!</h1>
                        }
                    </ModalBody>
            </ModalContent>
        </Modal>
    )
}