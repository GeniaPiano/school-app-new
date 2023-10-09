import { FiHome, FiUser} from "react-icons/fi";
import {BiLogOut} from "react-icons/bi";
import {SidebarLink} from "../../types/sidebarLink";
import {BsInfoSquare} from "react-icons/bs";
import {RxDashboard} from "react-icons/rx";


export const sidebarLinksData: SidebarLink[] = [
    {
        icon: RxDashboard,
        title: 'Courses',
        path:'/student/courses',
    },
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