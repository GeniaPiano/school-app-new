import {Box, Flex, Icon, Menu, MenuButton, MenuItem, Text} from "@chakra-ui/react";
import {useState} from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import {useAuth} from "../../hooks/useAuth";

interface Props {
    navSize: string;
    title: string;
    icon: any, //@todo zmienić typ!!;
    active: boolean;
    path: string;

}


export const SidebarItem = (props: Props) => {
    const {signOut} = useAuth()

    const navigate = useNavigate()
    const handleLogout = () => {
        navigate('/')
        signOut();


    }

    const {navSize, title, icon, active, path} = props
    const [isHovered, setIsHovered] = useState(false);
    return (
        <Flex
            mt={30}
            flexDir="column"
            w="100%"
            p={3}
            borderRadius={8}
            background={isHovered ?  "brand.600" : "transparent"}
            alignItems={navSize === "small" ? "center" : "flex-start"}
            onMouseEnter={()=> {setIsHovered(true)}}
            onMouseLeave={()=> setIsHovered(false)}
        >
        <Menu placement="right">
            {title === 'Logout' ? (
                    <MenuButton onClick={handleLogout}
                                position="relative"
                                w={navSize === "large" ? "100%" : "auto"}>
                        <Flex alignItems="center" >
                            <Icon as={icon} fontSize="xl" color={active ? "teal": "gray.500"} />
                            <Text ml={5} display={navSize === "small" ? 'none' : 'flex'} > {title} </Text>
                        </Flex>
                    </MenuButton>
            )
                : (
                <NavLink
                    to={path}
                    background={active && "#AEC8CA"}
                    position="relative"
                    w={navSize === "large" ? "100%" : "auto"}
                >
                    <MenuButton>
                        <Flex alignItems="center" >
                            <Icon as={icon} fontSize="xl" color={active ? "teal": "gray.500"} />
                            <Text ml={5} display={navSize === "small" ? 'none' : 'flex'} > {title} </Text>
                        </Flex>
                    </MenuButton>
                </NavLink>
            ) }

            <>{navSize === 'small' && (
                <Box
                    onMouseEnter={()=> setIsHovered(true)}
                    onMouseLeave={()=> setIsHovered(false)}
                    display={isHovered ? "flex" : "none"}
                    color="brand.800"
                    fontSize="sm"
                    fontWeight="800"
                    position="absolute"
                    left="0"
                    mt="40px"
                    h="30px"
                >
                    <MenuItem
                        display="flex"
                        align="center"
                        justifyContent="center"
                    >
                        {title}
                    </MenuItem>
                </Box>
            )} </>




        </Menu
        >

        </Flex>
    )
}