import { FiGlobe, FiHome, FiUsers} from "react-icons/fi";
import {PiChalkboardTeacherDuotone} from "react-icons/pi";
import {BiLogOut} from "react-icons/bi";
import {SidebarLink} from "../../types/sidebarLink";



export const sidebarLinksData: SidebarLink[] = [

    {
        icon: FiHome,
        title: 'News',
        path: '/news',
    },
    {
        icon: FiGlobe,
        title: 'Courses',
        path: '/courses',
    },
    {
        icon: FiUsers,
        title: 'students',
        path: '/students',
    },
    {
        icon: PiChalkboardTeacherDuotone,
        title: 'Teachers',
        path: '/teachers',
    },
    {
        icon: BiLogOut,
        title: 'Logout',
        path: '/'
    },

]