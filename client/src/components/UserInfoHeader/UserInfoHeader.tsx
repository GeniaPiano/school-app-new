import {Avatar, HStack, Divider, Flex, Heading, Text, Button} from "@chakra-ui/react";
import {useAuth} from "../../hooks/useAuth";
import {useNavigate} from "react-router-dom";
import {ChangeColorModeBtn} from "../ChangeColorModeBtn/ChangeColorModeBtn";

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
                        <ChangeColorModeBtn/>
                        <Text fontSize="10px">{"role" in user ? user.role : ''}  </Text>
                        <Button onClick={handleSignOut}  variant="ghost" fontWeight="500" fontSize="10px" size="xs" >logout</Button>
                   </HStack>
                   <Heading ml={5} as="h3" color="myPink.600" fontSize="12px" fontWeight="500">{"email" in user ? user.email :''}</Heading>
               </Flex>
               <Avatar bg="myPink.500" color="white" size="md" name={avatarInitials} />
           </Flex>
        </Flex>
    )
}