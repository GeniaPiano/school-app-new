import { useContext} from "react";
import {Avatar, Divider, Flex, Heading, IconButton, Text} from "@chakra-ui/react";
import {CloseIcon, HamburgerIcon} from "@chakra-ui/icons";
import {SidebarItem} from "./SidebarItem";
import {sidebarLinksData} from "./sidebarLinksData";
import {NavSizeContext} from "../../provider/NavSizeProvider";


export const Sidebar = () => {

     const {navSize, changeNavSize} = useContext(NavSizeContext)


        return (
        <Flex
            color="gray.500"
            position="fixed" // Ustawienie pozycji na stałe
            top={0}
            left={5}
            h="95vh"
            mt="2.5vh"
            w={navSize === "small" ? "75px" :  {base: "150px", md: "200px"}}
            boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.1
            )"
            borderRadius={navSize === "small" ? '15px' : '30px'}
            flexDir="column"
            justifyContent="space-between"
        >

            <Flex
                as="nav"
                p="5%"
                flexDir="column"
                alignItems={navSize === "small" ? "center" : "flex-start"}
            >
                {/*hamburger menu*/}

                <Flex  alignItems="center"  >

                        <IconButton
                            background="none"
                            mt={5}
                            _hover={{background: 'none'}}
                            icon={navSize === "small"
                                ? <HamburgerIcon _hover={{color: "#AEC8CA"}}/>
                                : <CloseIcon
                                    color="gray.500"
                                    _hover={{color: "#AEC8CA"}}/>}
                            onClick={() =>     changeNavSize(navSize === "small" ? "large" : "small" )}
                        />
                   </Flex>
                        <>{
                            sidebarLinksData.map(oneLink => (

                                  <SidebarItem  key={oneLink.title} navSize={navSize} icon={oneLink.icon} path={oneLink.path} title={oneLink.title}/>

                            ))
                        }</>
                    </Flex>
            <Flex
                p="5%"
                flexDir="column"
                w="100%"
                alignItems={navSize === "small" ? "center" : "flex-start"}
                left="0"
                            >
            <Divider  />
            <Flex mt={4} align="center" gap="5px">
                   <Avatar size="sm" name="admin" bg="gray.400"/>
                   <Flex flexDir="column"
                         display={navSize === "small" ? "none" : "flex"}>
                       <Heading as="h3" fontSize="12px" fontWeight="500">admin@adin.com</Heading>
                       <Text fontSize="xs">admin</Text>
                   </Flex>
               </Flex>
            </Flex>

        </Flex>
    )

}