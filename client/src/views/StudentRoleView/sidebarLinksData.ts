import { FiGlobe, FiHome, FiUser} from "react-icons/fi";
import {PiChalkboardTeacherDuotone} from "react-icons/pi";
import {BiLogOut} from "react-icons/bi";
import {SidebarLink} from "../../types/sidebarLink";
import {EmailIcon} from "@chakra-ui/icons";



export const sidebarLinksData: SidebarLink[] = [
    {
        icon: FiHome,
        title: 'Home',
        path: '/student/news',
    },
    {
        icon: FiUser,
        title: 'Account',
        path: '/student/my-account',
    },

    {
        icon: EmailIcon,
        title: 'News',
        path: '/student/contact',
    },

    {
        icon: BiLogOut,
        title: 'Logout',
        path: '/'
    },

]