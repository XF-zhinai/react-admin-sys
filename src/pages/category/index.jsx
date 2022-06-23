// 品类路由
import React from "react";
import { Card, Button, Table, Space } from "antd";
import LinkButton from "../../components/button";
import { PlusOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { reqCategoryList } from '../../api/index'



class Category extends React.Component {
    state = {
        categoryList: [],
        loading: true,
        isOneCategory: true,
        parentName: ''
    }

    initColumns = () => {
        this.columns = [
            {
                title: '分类名称',
                dataIndex: 'name',
                key: '_id',
            },

            {
                title: '操作',
                key: 'action',
                render: (_, record) => (
                    <Space>
                        <LinkButton>修改分类</LinkButton>
                        {record.parentId === '0' && <LinkButton onClick={() => { this.showSubCategory(record) }}>查看子分类</LinkButton>}
                    </Space>
                ),
                width: '30%'
            },
        ]
    }

    
    showSubCategory = (record) => {
        this.setState({
            isOneCategory: false,
            parentName: record.name
        })
        this.getCategory(record._id)
        
    }

    getCategory = (parentId) => {
        reqCategoryList(parentId).then(res => {
            this.setState({
                categoryList: res.data,
                loading: false
            })
        })
    }

    handleOnCategory = () => {
        this.setState({isOneCategory: true})
        this.getCategory(0)
    }

    componentDidMount() {
        this.initColumns()
        this.getCategory(0)
    }

    componentWillUnmount() {
        this.setState = (state,callback)=>{
            return;
        };
    }
    
    render() {
        const {parentName} = this.state
        const title = this.state.isOneCategory ? '一级分类列表' : (
            <span>
                <LinkButton onClick={this.handleOnCategory}>一级分类列表</LinkButton>
                <ArrowRightOutlined style={{marginRight: '10px'}} />
                <span>{parentName}</span>-
            </span>
        )
        return (
            <>
                <Card
                    title={title}
                    extra={<Button href="#" type="primary"><PlusOutlined />添加</Button>}
                    style={{
                        width: '100%',
                    }}
                >
                    <Table
                        columns={this.columns}
                        rowKey="_id"
                        dataSource={this.state.categoryList}
                        loading={this.state.loading}
                        pagination={{
                            pageSize: 8,
                            showQuickJumper: true
                        }}
                        bordered
                    />
                </Card>
            </>
        );
    }
}

export default Category;
