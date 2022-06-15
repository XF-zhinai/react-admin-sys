import React from 'react'
import { Spin } from 'antd';

const Loading = (props) => {
	const style={
		width:'100%',
		height:'100%',
		display:'flex',
		justifyContent:'center',
		alignItems:'center',
	}
    return (
        <div style={style}><Spin tip="加载中..."></Spin></div>
    )
}
export default Loading