import { FiGlobe, FiHome, FiUser} from "react-icons/fi";
import {PiChalkboardTeacherDuotone} from "react-icons/pi";
import {BiLogOut} from "react-icons/bi";
import {SidebarLink} from "../../types/sidebarLink";
import {BsInfoSquare} from "react-icons/bs";




export const sidebarLinksData: SidebarLink[] = [
    {
        icon: FiHome,
        title: 'Home',
        path: '/student/home',
    },
    {
        icon: FiUser,
        title: 'Account',
        path: '/student/my-account',
    },

    {
        icon:BsInfoSquare,
        title: 'Info',
        path: '/student/info',
    },

    {
        icon: BiLogOut,
        title: 'Logout',
        path: '/'
    },

]