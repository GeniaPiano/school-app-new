import {CalendarIcon} from "@chakra-ui/icons";
import {FiCornerLeftDown, FiGlobe, FiHome, FiMessageSquare, FiUsers} from "react-icons/fi";

export const sidebarLinksData = [
    {
        icon: FiHome,
        title: 'Courses',
        path: '/courses',
    },
    {
        icon: FiUsers,
        title: 'Students',
        path: '/students',
    },
    {
        icon: CalendarIcon,
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