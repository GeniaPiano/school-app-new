import { FiGlobe, FiHome, FiUsers} from "react-icons/fi";
import {PiChalkboardTeacherDuotone} from "react-icons/pi";
import {BiLogOut} from "react-icons/bi";

export const sidebarLinksData = [
    {
        icon: FiHome,
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