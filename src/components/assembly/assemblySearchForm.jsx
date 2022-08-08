import React, { useState, forwardRef } from "react";
import { Form, Button, Select, Input } from "antd";
import "../css/components.scss";
const AssemblySearchForm = (props, ref) => {
  let initialValues = {};
  const searchFormList = props.form.detail;
  const [searchForm] = Form.useForm();

  const flexLabel = (arr) => {
    let num = 1;
    arr.forEach(ele => {
        if (ele.title.length > num) num = ele.title.length;
        if (ele.value && ele.type) initialValues[ele.field] = ele.value
    });
    return num += 2
  };

  const style = {
    gridTemplateColumns: `${flexLabel(searchFormList)}em auto`,
  };

  const onFinish = (values) => {
    props.form.submit(values);
  };

  const empty = () => {
    searchForm.resetFields();
  };

  const reset = () => {
    searchForm.resetFields();
    searchForm.submit();
  };

  const getField = (item, index) => {
    switch (item.type) {
      case "select":
        return <Select {...item.opt} options={item.data} />;
      default:
        return <Input {...item.opt} />;
    }
  };
  return (
    <div className="assembly_search_form_box">
      <Form
        className="search_form_grid"
        form={searchForm}
        onFinish={onFinish}
        initialValues={initialValues}
        autoComplete="off"
        {...props.options}
      >
        <div className="search_form_item">
          {searchFormList.map((item, index) => (
            <div key={index} className="search_form_column">
              <Form.Item
                label={item.title}
                name={
                  item.field instanceof Array ? item.field[0].field : item.field
                }
                key={index}
                style={style}
              >
                {getField(item, index)}
              </Form.Item>
            </div>
          ))}
        </div>
        <div className="search_btn">
          <Button id="empty" style={{ display: "none" }} onClick={empty}>
            清空
          </Button>
          <Button type="primary" htmlType="submit">
            查询
          </Button>
          <Button id="reset" style={{ margin: "0 8px" }} onClick={reset}>
            重置
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AssemblySearchForm;
