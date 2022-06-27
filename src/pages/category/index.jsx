// 品类路由
import React from "react";
import {
    Card,
    Button,
    Table,
    Space,
    Modal,
    Form,
    Input,
    Tabs,
    Select 
} from "antd";
import LinkButton from "../../components/button";
import { PlusOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { reqCategoryList, reqUpDateCategory, reqAddCategory } from '../../api/index'
import './index.scss'

const { TabPane } = Tabs;
const { Option } = Select;
class Category extends React.Component {
    state = {
        categoryList: [],
        loading: true,
        isOneCategory: true,
        parentName: '',
        parentId: '',
        isModalVisible: 0, // 0: 关闭 1：添加 2：修改
        curTabs: '1'
    }

    editFromRef = React.createRef()
    addOneFromRef = React.createRef()
    addTowFromRef = React.createRef()

    // 初始化商品表格
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

    // 修改分类
    editCategory = (record) => {
        this.editFromRef.current.setFieldsValue({
            categoryName: record.name,
        })
        this.setState({
            isModalVisible: 2,
            parentId: record._id
        })
    }

    // 查看子分类
    showSubCategory = (record) => {
        this.setState({
            isOneCategory: false,
            parentName: record.name
        })
        this.getCategory(record._id)
    }

    // 获取所有商品的列表
    getCategory = (parentId) => {
        reqCategoryList(parentId).then(res => {
            this.setState({
                categoryList: res.data,
                loading: false
            })
        })
    }

    // 一级分类列表
    handleOnCategory = () => {
        this.setState({isOneCategory: true})
        this.getCategory(0)
    }

    // 调用添加一、二级商品的接口
    getAddCategory = (parentId, categoryName) => {
        reqAddCategory({ parentId, categoryName }).then(res => {
            if (res.status === 0) {
                this.setState({ isModalVisible: 0 })
                this.getCategory(0)
            }
        })
    }

    // 添加商品
    handleAddCategory = () => {
        // 一级商品
        if (this.state.curTabs === '1') {
            this.addOneFromRef.current.validateFields().then(res => {
                this.getAddCategory(0, res.oneCategoryName)
            }).catch(err => { })
        }
        // 二级商品
        if (this.state.curTabs === '2') {
            this.addTowFromRef.current.validateFields().then(res => {
                this.getAddCategory(res.selectOneCategoryName, res.towCategoryName)
            }).catch(err => {})
        }
    }

    // 修改商品
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
                <span>{parentName}</span>
            </span>
        )
        return (
            <>
                <Card
                    title={title}
                    extra={<Button type="primary" onClick={() => {this.setState({ isModalVisible: 1 })}}><PlusOutlined />添加</Button>}
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
                    className="addModal"
                    title="添加"
                    cancelText="取消"
                    okText="确认"
                    destroyOnClose={true}
                    visible={isModalVisible === 1}
                    onOk={this.handleAddCategory}
                    onCancel={() => { this.setState({ isModalVisible: 0 })}}
                >
                    <Tabs
                        defaultActiveKey="1"
                        destroyInactiveTabPane={true}
                        onChange={(key) => {this.setState({curTabs: key})}}
                    >
                        <TabPane tab="一级分类商品" key="1">
                            <Form
                                ref={this.addOneFromRef}
                                name="addOne"
                                autoComplete="off"
                                preserve={false}
                            >
                                <Form.Item
                                    label="分类名称"
                                    name="oneCategoryName"
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
                        </TabPane>
                        <TabPane tab="二级分类商品" key="2">
                            <Form
                                ref={this.addTowFromRef}
                                name="addTow"
                                autoComplete="off"
                                preserve={false}
                            >
                                <Form.Item
                                    label="选择分类"
                                    name="selectOneCategoryName"
                                    rules={[
                                        {
                                            required: true,
                                            message: '分类名称不能为空',
                                        },
                                    ]}
                                >
                                    <Select>
                                        {
                                            categoryList.map(item => (
                                                <Option
                                                    key={item._id}
                                                    value={item._id}
                                                >
                                                    {item.name}
                                                </Option>
                                                
                                            ))
                                        }
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    label="分类名称"
                                    name="towCategoryName"
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
                        </TabPane>
                    </Tabs>
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
