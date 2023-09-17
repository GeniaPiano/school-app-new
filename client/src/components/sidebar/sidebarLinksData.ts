import {FiCornerLeftDown, FiGlobe, FiHome, FiUsers} from "react-icons/fi";
import {PiChalkboardTeacherDuotone} from "react-icons/pi";

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
        icon: FiCornerLeftDown,
        title: 'Logout',
        path: '/logout'
    },

]