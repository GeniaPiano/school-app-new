import { FiGlobe, FiHome, FiUser} from "react-icons/fi";
import {PiChalkboardTeacherDuotone} from "react-icons/pi";
import {BiLogOut} from "react-icons/bi";
import {SidebarLink} from "../../types/sidebarLink";



export const sidebarLinksData: SidebarLink[] = [
    {
        icon: FiHome,
        title: 'Home',
        path: '/student',
    },
    {
        icon: FiUser,
        title: 'Account',
        path: '/students',
    },
    {
        icon: PiChalkboardTeacherDuotone,
        title: 'Teachers',
        path: '/teachers',
    },
    {
        icon: FiGlobe,
        title: 'News',
        path: '/news',
    },
    {
        icon: BiLogOut,
        title: 'Logout',
        path: '/'
    },

]