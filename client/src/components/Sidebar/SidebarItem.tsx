import {Box, Flex, Icon, Menu, MenuButton, Text, MenuItem} from "@chakra-ui/react";
import {useState} from 'react';
import {NavLink} from "react-router-dom";

interface Props {
    navSize: string;
    title: string;
    icon: any, //@todo zmienić typ!!;
    active: boolean;
    path: string;
    isHoverLink:boolean;
    changeHoveLink: ()=> void;
}


export const SidebarItem = (props: Props) => {

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
                <NavLink
                    to={path}
                    background={active && "#AEC8CA"}
                    position="relative"
                    w={navSize === "large" ? "100%" : "auto"}
                   >
                    <MenuButton>
                        <Flex alignItems="center" >
                            <Icon as={icon} fontSize="xl" color={active ? "#AEC8CA": "gray.500"} />
                            <Text ml={5} display={navSize === "small" ? 'none' : 'flex'} > {title} </Text>
                        </Flex>
                    </MenuButton>
                </NavLink>

            <>{navSize === 'small' && (
                <Box
                    onMouseEnter={()=> setIsHovered(true)}
                    onMouseLeave={()=> setIsHovered(false)}
                    display={isHovered ? "flex" : "none"}
                    bg="brand.600"
                    fontSize="28px"
                    fontWeight="800"
                    mt="0"
                    borderRadius={8}
                    position="absolute"
                    left="100%"
                    minWidth="70vw"
                    h={200}
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