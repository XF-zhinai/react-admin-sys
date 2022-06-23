import { Navigate } from 'react-router-dom';
import { lazy } from './global';
import storage from '../utils/storage.js'
import Admin from '../pages/admin/admin.jsx'
import Login from '../pages/login/login.jsx'
import NotFound from '../components/NoFound';

// 路由守卫
const RouteGuard = ({ children }) => {
    const { username, _id } = storage.getUser()
    return username && _id ? children : <Navigate to='/login'></Navigate>
}

const route = [
    {
        path: '/',
        element: <RouteGuard><Admin /></RouteGuard>,
        children: [
            {
                title: '首页',
                path: 'home',
                element: lazy(import("../pages/home"))
            }, {
                path: 'category',
                element: lazy(import("../pages/category"))
            }, {
                path: 'product',
                element: lazy(import("../pages/product"))
            }, {
                path: 'role',
                element: lazy(import("../pages/role"))
            }, {
                path: 'user',
                element: lazy(import("../pages/user"))
            }, {
                path: 'bar',
                element: lazy(import("../pages/charts/bar"))
            }, {
                path: 'line',
                element: lazy(import("../pages/charts/line"))
            }, {
                path: 'pie',
                element: lazy(import("../pages/charts/pie"))
            }
        ]
    },
    {
        path: 'login',
        element: <Login />
    },
    {
        path: '*',
        element: <NotFound />
    }
]

export default route