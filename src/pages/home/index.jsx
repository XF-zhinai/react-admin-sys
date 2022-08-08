// 首页路由
import React from "react";
import AssemblyModal from "../../components/assembly/assemblyModal";
import AssemblyTable from "../../components/assembly/assemblyTable";
import LinkButton from "../../components/button";
import AssemblySearchForm from "../../components/assembly/assemblySearchForm";
import Api from "../../api/http";
import { Button, Space } from "antd";
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
    this.modalRef1 = React.createRef();
    this.modalRef2 = React.createRef();
    this.modalRef3 = React.createRef();
    this.tableRef = React.createRef();
    this.handelClick1 = this.handelClick1.bind(this);
    this.handelClick2 = this.handelClick2.bind(this);
    this.handelClick3 = this.handelClick3.bind(this);
    
  }

  isModal1 = {
    modelType: {
      opt: {
        footer: false,
        width: 500,
      },
      type: "form",
      form: {
        options: {
          wrapperCol: { span: 18 },
        },
        detail: [
          {
            title: "姓名",
            field: "name",
            disabled: true,
          },
          {
            title: "年龄",
            field: "age",
            disabled: true,
          },
        ],
      },
    },
  };

  tabsModal = {
    modelType: {
      type: "tabs",
      form1: {
        tab: "一级分类商品",
        detail: [
          {
            title: "分类名称",
            field: "addOne",
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
            field: "selectOne",
            required: true,
            message: "分类名称不能为空",
            data: [
              {
                label: "N",
                value: "622222222",
              },
            ],
          },
          {
            title: "分类名称",
            field: "addTow",
            required: true,
            message: "分类名称不能为空",
          },
        ],
      },
    },
  };

  isModal3 = {
    modelType: {
      type: "form",
      detail: [
        {
          title: "姓名",
          field: "name",
          required: true,
          message: "姓名不能为空",
        },
        {
          title: "年龄",
          field: "age",
        },
        {
          title: "邮箱",
          field: "email",
        },
      ],
    },
  };

  // 配置表格
  tableConfig = {
    request: {
      url: Api.categoryList(),
      data: { parentId: 0 },
    },
    table: {
      columns: [
        {
          title: "序号",
          width: 80,
          render: (text, record, index) => index + 1,
        },
        {
          title: "分类名称",
          dataIndex: "name",
        },
        {
          title: "操作",
          width: "30%",
          render: (text, record, index) => (
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
        },
      ],
    },
  };

  // 配置搜索框
  searchForm = {
    form: {
      detail: [
        {
          title: '商品水水',
          field: "name",
          value: "name",
          opt: {
            onClick: (e) => {
              console.log(222);
            },
          },
        },
        {
          title: "下拉框",
          field: "select",
          type: "select",
          value: "111",
          data: [
            {
              label: "1",
              value: "1",
            },{
              label: "2",
              value: "2",
            },{
              title: "名称",
              field: "name",
            },
          ],
        },
      ],
      submit: (value) => {
        console.log(value);
      }
    },
  };

  editCategory(record) {
    console.log(record);
  }

  showSubCategory(record) {
    console.log(record);
  }

  handelClick1() {
    this.modalRef1.current.openModal("detail");
  }
  handelClick2() {
    this.modalRef2.current.openModal("add");
  }
  handelClick3() {
    this.modalRef3.current.openModal("edit");
  }
  successFn1(data) {
    console.log("data", data);
  }
  successFn2(data) {
    console.log("data", data);
    setTimeout(() => {
      this.modalRef2.current.closeModal();
    }, 2000);
  }
  successFn3(data) {
    // 发请求
    console.log("data", data);
    setTimeout(() => {
      this.modalRef3.current.closeModal();
    }, 2000);
  }

  getQueryParams = () => {
    console.log("queryParams", this.tableRef.current.queryParams);
  };
  getSelectedRowKeys = () => {
    console.log("selectedRowKeys", this.tableRef.current.selectedRowKeys);
  };
  getTableData = () => {
    console.log("refreshTable");
    this.tableRef.current.getTableData();
  };
  render() {
    return (
      <>
        <div>首页</div>
        <Button onClick={this.handelClick1}>点击1</Button>
        <Button onClick={this.handelClick2}>点击2</Button>
        <Button onClick={this.handelClick3}>点击3</Button>

        <Button type="primary" onClick={() => this.getQueryParams()}>
          获取表格参数
        </Button>
        <Button type="primary" onClick={() => this.getSelectedRowKeys()}>
          获取选中项rowkey数组
        </Button>
        <Button type="primary" onClick={() => this.getTableData()}>
          刷新表格
        </Button>

        <AssemblyModal
          ref={this.modalRef1}
          {...this.isModal1}
          successFn={this.successFn1}
        />
        <AssemblyModal
          ref={this.modalRef2}
          {...this.tabsModal}
          successFn={this.successFn2.bind(this)}
        />
        <AssemblyModal
          ref={this.modalRef3}
          {...this.isModal3}
          successFn={this.successFn3.bind(this)}
        />
        <AssemblySearchForm {...this.searchForm} />
        <AssemblyTable ref={this.tableRef} tableConfig={this.tableConfig} />
      </>
    );
  }
}

export default Home;
