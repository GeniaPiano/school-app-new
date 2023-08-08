import {Box, Flex, Icon, Link, Menu, MenuButton, Text, MenuList, MenuItem} from "@chakra-ui/react";
import {useState} from 'react';


export const SidebarItem = ({navSize, title, icon, active}) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Flex
            mt={30}
            flexDir="column"
            w="100%"
            alignItems={navSize === "small" ? "center" : "flex-start"}
        >
        <Menu placement="right">

                <Link
                    backgroundColor={active && "#AEC8CA"}
                    p={3}
                    borderRadius={8}
                    position="relative"
                    _hover={{textDecor: 'none', backgroundColor: "#AEC8CA"}}
                    w={navSize === "large" ? "100%" : "auto"}
                    onMouseEnter={()=> setIsHovered(true)}
                    onMouseLeave={()=> setIsHovered(false)}>
                    <MenuButton>
                        <Flex alignItems="center" >
                            <Icon as={icon} fontSize="xl" color={active ? "#AEC8CA": "gray.500"} />
                            <Text ml={5} display={navSize === "small" ? 'none' : 'flex'} > {title} </Text>
                        </Flex>
                    </MenuButton>
                </Link>


            <Box
                onMouseEnter={()=> setIsHovered(true)}
                onMouseLeave={()=> setIsHovered(false)}
                display={isHovered ? "flex" : "none"}
                bg="#AEC8CA"
                borderRadius={8}
                position="absolute"
                left="100%"
                w={200}
                h={200}
                >
                <MenuItem>
                   Link
                </MenuItem>
            </Box>
        </Menu
        >

        </Flex>
    )
}