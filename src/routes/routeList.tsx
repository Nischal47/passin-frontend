import Login from "../modules/auth/login/index";
import Signup from "../modules/auth/signup";
import Dashboard from "../modules/home/dashboard";


let routeList: {
    path: string
    component: any
    name: string
    exact: boolean
    isAuth: boolean
}[];

routeList = [
    {
        path: '/',
        name:'login',
        exact:true,
        component:Login,
        isAuth:false
    },
    {
        path: '/signup',
        name:'signup',
        exact:true,
        component:Signup,
        isAuth:false
    },
    {
        path:'/dashboard',
        name:'dashboard',
        exact: true,
        component:Dashboard,
        isAuth:true
    }
];

export default  routeList
