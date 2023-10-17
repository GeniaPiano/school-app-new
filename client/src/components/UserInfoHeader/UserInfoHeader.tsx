import {
    Avatar,
    HStack,
    Divider,
    Flex,
    Text,
    Button,
} from "@chakra-ui/react";
import {useAuth} from "../../hooks/useAuth";
import {useNavigate} from "react-router-dom";
import {ChangeColorModeBtn} from "../ChangeColorModeBtn/ChangeColorModeBtn";
import { BsFillCartFill} from "react-icons/bs";
import {useCart} from "../../hooks/useCart";
import {Cart} from "../Cart/Cart";

export const UserInfoHeader = () => {

    const {user, signOut} = useAuth();
    const navigate = useNavigate();
    const {onOpenCart} = useCart();
    const cart = useCart();
    const totalCountProducts = cart.productsCount
    const handleSignOut = async() => {
        await signOut();
        navigate('/');
    }

    let avatarInitials;
    switch (user?.role) {
        case "admin":
            avatarInitials = 'admin';
            break;
        case "student":
            avatarInitials = 'student'
            break;
        case "teacher":
            avatarInitials = 'teacher';
            break;
        default:
            avatarInitials = null;
    }

    return (
        <Flex alignContent="flex-end" color="gray.500">
            <Divider/>
            <Flex mt={4} alignItems="center" gap="5px">

               <Flex flexDir="column" justifyItems="flex-end" >
                   <HStack>
                        <ChangeColorModeBtn/>
                       {"role" in user && (user.role === 'admin' | user.role === 'teacher') ? <Text fontSize="10px"> {user.role} </Text>  : null  }
                        <Button onClick={handleSignOut}
                                m={0} variant="ghost"
                                fontWeight="600"
                                color="gray.500"
                                fontSize="12px"
                                size="xs" >
                            logout</Button>
                   </HStack>
                   <Text  ml={5} color="myPink.600" fontSize="12px" fontWeight="500"> {"email" in user ? user.email :''}</Text>

                   {user.role === 'student' && (
                       <>
                           {/*cart icon */}
                           <Button
                               onClick={()=> onOpenCart()}
                               porition="relative"
                               my={2}
                               color='myPink.500'>
                               <HStack>
                                   <Text fontSize="10px" >products <br/>in cart: {totalCountProducts} </Text>
                                   <BsFillCartFill fontSize='25px'
                                                   variant='ghost'/>
                               </HStack>
                           </Button>
                       </>
                   )}
               </Flex>
               <Avatar bg="myPink.500" color="white" size="md" name={avatarInitials} />
           </Flex>
            {user.role === 'student' && <Cart/>}

        </Flex>
    )
}