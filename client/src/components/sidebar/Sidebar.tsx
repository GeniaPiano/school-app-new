import { useContext} from "react";
import { Flex, IconButton} from "@chakra-ui/react";
import {CloseIcon, HamburgerIcon} from "@chakra-ui/icons";
import {SidebarItem} from "./SidebarItem";
import {NavSizeContext} from "../../providers/NavSizeProvider";
import {useAuth} from "../../hooks/useAuth";

export const Sidebar = ({data}) => {
    const {user} = useAuth()
    const {navSize, changeNavSize} = useContext(NavSizeContext)
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



        <Flex
            color="gray.500"
            position="fixed"
            ml={3}
            h="95vh"
            mt="2.5vh"
            w={navSize === "small" ? "75px" :  {base: "150px", md: "200px"}}
            boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.1
            )"
            borderRadius={navSize === "small" ? '15px' : '30px'}
            flexDir="column"

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
                            aria-label="navigation icons"

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
                            data.map(oneLink => (
                                <SidebarItem  key={oneLink.title} navSize={navSize} icon={oneLink.icon} path={oneLink.path} title={oneLink.title}/>
                            ))
                        }</>
                    </Flex>


        </Flex>
    )

}