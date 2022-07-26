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

// 格式化日期
const formateDate = (time) => {
    if (!time) return ''
    let date = new Date(time) 
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    + ' ' + date.getHours() + ':' + date.getMinutes()
}

// 深度拷贝
const deepCopy = (obj) => {
    if (typeof obj !== 'object') return
    let newObj = obj instanceof Array ? [] : {}
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            newObj[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key]
        }
    }
    return newObj
}
export {
    withRouter,
    lazy,
    formateDate,
    deepCopy
}
