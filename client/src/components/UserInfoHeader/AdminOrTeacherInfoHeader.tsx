import {Avatar, Button, Divider, Flex, HStack, Text} from "@chakra-ui/react";
import {ChangeColorModeBtn} from "../ChangeColorModeBtn/ChangeColorModeBtn";
import {useAuth} from "../../hooks/useAuth";
interface Props {
    handleSignOut: ()=> void;
}

export const AdminOrTeacherInfoHeader = ({handleSignOut}:Props) => {
    const {user} = useAuth();

    return (
        <Flex alignContent="flex-end" color="gray.500">
            <Divider/>
            <Flex mt={4} alignItems="center" gap="5px">

            <Flex flexDir="column" justifyItems="flex-end" >
                <HStack>
                    <ChangeColorModeBtn/>
                      <Text>{"role" in user ? user.role : ''}</Text>
                        <Button onClick={handleSignOut}
                            m={0} variant="ghost"
                            fontWeight="600"
                            color="gray.500"
                            fontSize="12px"
                            size="xs" >
                            logout</Button>
                    </HStack>
                     <Text  ml={5} color="myPink.600" fontSize="12px" fontWeight="500"> {"email" in user ? user.email :''}</Text>
             </Flex>
            <Avatar bg="myPink.500" color="white" size="md" name={!(user) || user.role === 'admin'? 'Admin' : 'Teacher'} />
            </Flex>
        </Flex>
    )
 }