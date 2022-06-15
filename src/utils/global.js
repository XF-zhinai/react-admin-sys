import React from "react";
import {
    useLocation,
    useNavigate,

} from "react-router";
import Loading from "../components/loading";

// 类组件路由api
const withRouter = (Child) => {
    return (props) => {
        const location = useLocation()
        const navigate = useNavigate()
        return <Child {...props} navigate={navigate} location={location} />

    }
}

// 路由懒加载
const lazy = (component) => {
    const Page = React.lazy(() => component)
    return (
        <React.Suspense fallback={<Loading />}>
            <Page/>
        </React.Suspense>
    )
}
export {
    withRouter,
    lazy
}
