import {Avatar, HStack, Divider, Flex, Heading, Text, Button, IconButton} from "@chakra-ui/react";
import {useAuth} from "../../hooks/useAuth";
import {useNavigate} from "react-router-dom";
import {ChangeColorModeBtn} from "../ChangeColorModeBtn/ChangeColorModeBtn";
import {BsFillCartCheckFill, BsFillCartFill} from "react-icons/bs";

export const UserInfoHeader = () => {

    const {user, signOut} = useAuth()
    const navigate = useNavigate()
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
                       {user.role === 'student' && (
                           <>
                               <IconButton
                                   m={0}
                                   fontSize='22px'
                                   variant='ghost'
                                   color='myPink.500'
                                   aria-label='add to cart icon' icon={<BsFillCartFill/>}/>
                           </>
                       )}
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
                   <Heading ml={5} as="h3" color="myPink.600" fontSize="12px" fontWeight="500">
                       <Text>{"email" in user ? user.email :''}</Text>

                   </Heading>
               </Flex>
               <Avatar bg="myPink.500" color="white" size="md" name={avatarInitials} />
           </Flex>
        </Flex>
    )
}