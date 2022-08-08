// 商品路由
import React from "react";
import {
  Card,
  Button,
  Table,
  Space,
  Modal,
  Form,
  Input,
  Image,
  Select,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import LinkButton from "../../components/button";
import { withRouter } from "../../utils/global";
import { reqCategory } from "../../api";
import Api from "../../api/http";
import "./index.scss";

const { Option } = Select;
const { TextArea } = Input;
class Product extends React.Component {
  state = {
    productList: [],
    loading: true,
    isProductModal: false,
    productImage: [],
    oneCategoryName: "",
    towCategoryName: "",
  };

  searchFromRef = React.createRef();
  detailFromRef = React.createRef();

  // 初始化商品表格
  initColumns = () => {
    this.columns = [
      {
        title: "商品名称",
        dataIndex: "name",
        key: "_id",
        render: (text, record) => (
          <LinkButton
            onClick={() => {
              this.toProductDetails(record);
            }}
          >
            {text}
          </LinkButton>
        ),
      },
      {
        title: "商品描述",
        dataIndex: "desc",
        key: "_id",
      },
      {
        title: "价格",
        dataIndex: "price",
        key: "_id",
      },
      {
        title: "状态",
        dataIndex: "status",
        key: "_id",
        width: 80,
        render: (text, record) => (
          <span>{text === "1" ? "已上架" : "未上架"}</span>
        ),
      },

      {
        title: "操作",
        key: "action",
        width: 130,
        render: (_, record) => (
          <Space>
            <LinkButton
              onClick={() => {
                this.editCategory(record);
              }}
            >
              修改
            </LinkButton>
            <LinkButton
              onClick={() => {
                this.lowerCategory(record);
              }}
            >
              下架
            </LinkButton>
          </Space>
        ),
      },
    ];
  };

  // 获取商品列表
  getProductList = () => {
    window.$http
      .get({
        url: Api.productList(),
        data: { pageNum: 1, pageSize: 20 },
      })
      .then((res) => {
        this.setState({
          productList: res.data.list,
          loading: false,
        });
      });
  };

  // 获取商品名称
  getCategoryName = async (type, pId, id) => {
    if (type === "1") {
      const results = await this.getCategoryList(id)
      this.setState({
        oneCategoryName: results.data.name,
        towCategoryName: "",
      });
    } else {
      const results = await Promise.all([this.getCategoryList(pId), this.getCategoryList(id)]);
      this.setState({
        oneCategoryName: results[0].data.name,
        towCategoryName: results[1].data.name,
      });
    }
  };

  getCategoryList = (id) => {
    const results = window.$http
    .get({
      url: Api.productList(),
      data: { categoryId: id },
    })
    return results
  } 

  // 获取搜索商品列表
  getSearchCategoryList = (searchObj) => {
    window.$http
      .get({
        url: Api.searchCategory(),
        data: searchObj,
      })
      .then((res) => {
        this.setState({ productList: res.data.list });
        this.searchFromRef.current.setFieldsValue({ searchKey: "" });
      });
  };

  // 商品详情信息
  toProductDetails = (record) => {
    if (record.pCategoryId === "0") {
      // 一级分类名称
      this.getCategoryName("1", "0", record.categoryId);
    } else {
      // 二级分类名称
      this.getCategoryName("2", record.pCategoryId, record.categoryId);
    }
    this.setState({
      isProductModal: true,
      productImage: record.imgs,
    });
    if (record.hasOwnProperty("detail")) {
      let detail = record.detail.match(/(?<=yahei;">).*?(?=<\/span>)/)
        ? record.detail.match(/(?<=yahei;">).*?(?=<\/span>)/)[0]
        : "暂无详情";
      this.detailFromRef.current.setFieldsValue({ ...record, ...{ detail } });
    }
  };

  // 修改商品
  editCategory = (record) => {};

  // 下架商品
  lowerCategory = (record) => {};

  // 搜索表单
  onSearchFinish = (values) => {
    if (!values.searchKey.indexOf(" ")) {
      alert("不能输入空格");
      return false;
    }
    if (values.searchKey === "") {
      this.getSearchCategoryList();
    } else {
      this.getSearchCategoryList({ [values.searchName]: values.searchKey });
    }
  };

  componentDidMount() {
    this.initColumns();
    this.getProductList();
  }

  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
  }

  render() {
    const {
      productList,
      loading,
      isProductModal,
      productImage,
      towCategoryName,
      oneCategoryName,
    } = this.state;
    const title = (
      <Form
        ref={this.searchFromRef}
        onFinish={this.onSearchFinish}
        name="addOne"
        autoComplete="off"
        layout="inline"
        className="search_box"
      >
        <Form.Item name="searchName" initialValue="productName">
          <Select>
            <Option value="productName">商品名称搜索</Option>
            <Option value="productDesc">商品描述搜索</Option>
          </Select>
        </Form.Item>
        <Form.Item name="searchKey" initialValue="">
          <Input placeholder="关键字"></Input>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            搜索
          </Button>
        </Form.Item>
      </Form>
    );
    return (
      <>
        <Card
          title={title}
          extra={
            <Button
              type="primary"
              onClick={() => {
                this.props.navigate("/product/addProduct");
              }}
            >
              <PlusOutlined />
              添加商品
            </Button>
          }
          style={{
            width: "100%",
          }}
        >
          <Table
            columns={this.columns}
            rowKey="_id"
            dataSource={productList}
            loading={loading}
            pagination={{
              pageSize: 7,
              showQuickJumper: true,
            }}
            bordered
          />
        </Card>

        {/* 商品详情 */}
        <Modal
          title="详情"
          visible={isProductModal}
          footer=""
          width={600}
          onCancel={() => {
            this.setState({ isProductModal: false });
          }}
          forceRender={true}
        >
          <Form ref={this.detailFromRef} name="productDetails">
            <Form.Item label="商品名称" name="name">
              <Input disabled></Input>
            </Form.Item>
            <Form.Item label="商品描述" name="desc">
              <Input disabled></Input>
            </Form.Item>
            <Form.Item label="商品价格" name="price">
              <Input disabled></Input>
            </Form.Item>
            <Form.Item label="商品分类">
              <Input
                value={
                  towCategoryName
                    ? oneCategoryName + " --> " + towCategoryName
                    : oneCategoryName
                }
                disabled
              ></Input>
            </Form.Item>
            <Form.Item label="商品图片">
              {productImage.length ? (
                productImage.map((item, i) => (
                  <Image
                    key={i}
                    height={100}
                    width={100}
                    src={item}
                    fallback="data:image/png;base64,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"
                  />
                ))
              ) : (
                <Input value="暂无图片" disabled></Input>
              )}
            </Form.Item>
            <Form.Item label="商品详情" name="detail">
              <TextArea style={{ height: 100 }} disabled></TextArea>
            </Form.Item>
          </Form>
        </Modal>

        {/* 修改商品 */}
      </>
    );
  }
}

export default withRouter(Product);
