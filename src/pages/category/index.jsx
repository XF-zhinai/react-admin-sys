// 品类路由
import React from "react";
import { Card, Button, Table, Space } from "antd";
import LinkButton from "../../components/button";
import AssemblyModal from "../../components/assembly/assemblyModal";
import { PlusOutlined, ArrowRightOutlined } from "@ant-design/icons";
import Api from "../../api/http";
import "./index.scss";

class Category extends React.Component {
  state = {
    categoryList: [],
    loading: true,
    isOneCategory: true,
    parentName: "",
    parentId: "",
  };

  editModalRef = React.createRef();
  addModalRef = React.createRef();

  // 配置修改对话框
  editModal = {
    modelType: {
      type: "form",
      form: {
        detail: [
          {
            title: "分类名称",
            field: "name",
            required: true,
            message: "分类名称不能为空",
          },
        ],
      },
    },
  };

  // 配置添加(带分页)对话框
  addModal = {
    modelType: {
      type: "tabs",
      form1: {
        tab: "一级分类商品",
        detail: [
          {
            title: "分类名称",
            field: "categoryName",
            required: true,
            message: "分类名称不能为空",
          },
        ],
      },
      form2: {
        tab: "二级级分类商品",
        detail: [
          {
            type: "select",
            title: "选择分类",
            field: "parentId",
            required: true,
            message: "分类名称不能为空",
            data: [{}],
          },
          {
            title: "分类名称",
            field: "categoryName",
            required: true,
            message: "分类名称不能为空",
          },
        ],
      },
    },
  };

  // 初始化商品表格
  initColumns = () => {
    this.columns = [
      {
        title: "分类名称",
        dataIndex: "name",
        key: "_id",
      },

      {
        title: "操作",
        key: "action",
        render: (_, record) => (
          <Space>
            <LinkButton
              onClick={() => {
                this.editCategory(record);
              }}
            >
              修改分类
            </LinkButton>
            {record.parentId === "0" && (
              <LinkButton
                onClick={() => {
                  this.showSubCategory(record);
                }}
              >
                查看子分类
              </LinkButton>
            )}
          </Space>
        ),
        width: "30%",
      },
    ];
  };

  // 修改分类
  editCategory = (record) => {
    this.editModalRef.current.openModal("edit", record);
    this.setState({
      parentId: record._id,
    });
  };

  // 查看子分类
  showSubCategory = (record) => {
    this.setState({
      isOneCategory: false,
      parentName: record.name,
    });
    this.getCategory(record._id);
  };

  // 添加商品
  addCategory = () => {
    let selectOneCategory = [];
    this.state.categoryList.forEach((item) => {
      selectOneCategory.push({
        // @ts-ignore
        label: item.name,
        // @ts-ignore
        value: item._id,
      });
    });
    this.addModal.modelType.form2.detail[0].data = selectOneCategory;

    this.addModalRef.current.openModal("add");
  };

  editSuccessFn = (data) => {
    const dataObj = {
      categoryId: this.state.parentId,
      categoryName: data.name,
    };
    window.$http
      .post({
        url: Api.upDateCategory(),
        data: dataObj,
      })
      .then((res) => {
        if (res.status === 0) {
          this.editModalRef.current.closeModal();
          this.getCategory(0);
        }
      });
  };

  addSuccessFn = (data) => {
    if (data.parentId) {
      this.getAddCategory(data.parentId, data.categoryName);
    } else {
      this.getAddCategory(0, data.categoryName);
    }
  };

  // 获取所有商品的列表
  getCategory = (parentId) => {
    window.$http
      .get({
        url: Api.categoryList(),
        data: { parentId },
      })
      .then((res) => {
        this.setState({
          categoryList: res.data.reverse(),
          loading: false,
        });
      });
  };

  // 一级分类列表
  handleOnCategory = () => {
    this.setState({ isOneCategory: true });
    this.getCategory(0);
  };

  // 调用添加一、二级商品的接口
  getAddCategory = (parentId, categoryName) => {
    window.$http
      .post({
        url: Api.addCategory(),
        data: { parentId, categoryName },
      })
      .then((res) => {
        if (res.status === 0) {
          this.addModalRef.current.closeModal();
          this.getCategory(0);
        }
      });
  };

  componentDidMount() {
    this.initColumns();
    this.getCategory(0);
  }

  componentWillUnmount() {
    // @ts-ignore
    this.setState = (state, callback) => {
      return;
    };
  }

  render() {
    const { parentName, isOneCategory, categoryList, loading } = this.state;
    const title = isOneCategory ? (
      "一级分类列表"
    ) : (
      <span>
        <LinkButton onClick={this.handleOnCategory}>一级分类列表</LinkButton>
        <ArrowRightOutlined style={{ marginRight: "10px" }} />
        <span>{parentName}</span>
      </span>
    );
    return (
      <>
        <Card
          title={title}
          extra={
            <Button type="primary" onClick={this.addCategory}>
              <PlusOutlined />
              添加
            </Button>
          }
          style={{
            width: "100%",
          }}
        >
          <Table
            columns={this.columns}
            rowKey="_id"
            dataSource={categoryList}
            loading={loading}
            pagination={{
              pageSize: 8,
              showQuickJumper: true,
            }}
            bordered
          />
        </Card>

        {/* 切换对话框 */}
        <AssemblyModal
          ref={this.addModalRef}
          successFn={this.addSuccessFn}
          {...this.addModal}
        />

        {/* 修改对话框 */}
        <AssemblyModal
          ref={this.editModalRef}
          successFn={this.editSuccessFn}
          {...this.editModal}
        />
      </>
    );
  }
}

export default Category;
