// 品类路由
import React from "react";
import { Card, Button, Table, Space, Modal, Form, Input } from "antd";
import LinkButton from "../../components/button";
import { PlusOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { reqCategoryList, reqUpDateCategory } from '../../api/index'



class Category extends React.Component {
    state = {
        categoryList: [],
        loading: true,
        isOneCategory: true,
        parentName: '',
        parentId: '',
        isModalVisible: 0 // 0: 关闭 1：添加 2：修改
    }
    editFromRef = React.createRef()

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
                        <LinkButton onClick={() => { this.editCategory(record) }}>修改分类</LinkButton>
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

    addCategory = () => {
        this.setState({isModalVisible: 1})
    }

    editCategory = (record) => {
        this.editFromRef.current.setFieldsValue({
            categoryName: record.name,
        })
        this.setState({
            isModalVisible: 2,
            parentId: record._id
        })
        
    }

    handleAddCategory = () => {
        
    }

    handleEditCategory = () => {

        this.editFromRef.current.validateFields().then(res => {
            const dataObj = {
                categoryId: this.state.parentId,
                categoryName: res.categoryName
            } 
            reqUpDateCategory(dataObj).then(res => {
                if (res.status === 0) {
                    this.setState({
                        isModalVisible: 0,
                        isOneCategory: true
                    })
                    this.getCategory(0)
                    
                } 
            })
        }).catch(err => { })
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
        const { parentName, isOneCategory, categoryList, loading, isModalVisible } = this.state
        const title = isOneCategory ? '一级分类列表' : (
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
                    extra={<Button type="primary" onClick={this.addCategory}><PlusOutlined />添加</Button>}
                    style={{
                        width: '100%',
                    }}
                >
                    <Table
                        columns={this.columns}
                        rowKey="_id"
                        dataSource={categoryList}
                        loading={loading}
                        pagination={{
                            pageSize: 8,
                            showQuickJumper: true
                        }}
                        bordered
                    />
                </Card>

                <Modal
                    title="添加"
                    cancelText="取消"
                    okText="确认"
                    visible={isModalVisible === 1}
                    onOk={this.handleAddCategory}
                    onCancel={() => { this.setState({ isModalVisible: 0 })}}
                >
                    
                </Modal>

                <Modal
                    title="修改"
                    cancelText="取消"
                    okText="确认"
                    forceRender={true}
                    visible={isModalVisible === 2}
                    onOk={this.handleEditCategory}
                    onCancel={() => { this.setState({ isModalVisible: 0 })}}
                >
                    <Form
                        ref={this.editFromRef}
                        name="basic"
                        autoComplete="off"
                    >
                        <Form.Item
                            label="分类名称"
                            name="categoryName"
                            rules={[
                                {
                                    required: true,
                                    message: '分类名称不能为空',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Form>
                </Modal>
            </>
        );
    }
}

export default Category;
