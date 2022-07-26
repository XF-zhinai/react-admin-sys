import React, { forwardRef, useEffect } from "react";
import { Form, Input, Select } from "antd";
import { deepCopy } from "../../utils/global";
import "../css/components.scss";

const AssemblyForm = (props, ref) => {
  const { readOnly, successForm } = props;
  const initialValues = { ...props.initialValues }; // 表单的默认值

  const arrProps = deepCopy(props.form ? props.form.detail : props.detail); // 表单的字段值
  const optModal = props.opt === undefined ? { footer: true } : props.opt; // 表单的页脚
  const footer = { display: optModal.footer === false ? "none" : "" };
  const [formExample] = Form.useForm();
  const arrForm =
    readOnly === "readOnly"
      ? arrProps && arrProps.filter((item) => (item.disabled = true))
      : arrProps;
  // 提交表单
  const onFinish = (values) => {
    successForm(deepCopy(values));
  };

  // 取消表单
  const handleClose = () => {
    ref.current.closeModal();
  };

  // 表单字段列表
  const fieldList = (item) => {
    switch (item.type) {
      case "textarea":
        return (
          <Input.TextArea
            {...item.opt}
            disabled={item.disabled}
            options={item.data}
          />
        );
      case "select":
        return (
          <Select
            {...item.opt}
            disabled={item.disabled}
            options={item.data} />
        );

      default:
        return <Input {...item.opt} disabled={item.disabled} />;
    }
  };

  useEffect(() => {
    formExample.resetFields();
    formExample.setFieldsValue(initialValues);
  }, [props]);

  return (
    <div className="assembly_from_box">
      <Form
        form={formExample}
        initialValues={initialValues}
        autoComplete="off"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 24 }}
        onFinish={onFinish}
        // 从父组件自定义表单的一些配置
        {...(props.form ? props.form.options : {})}
      >
        <div className="assembly_form_item">
          {arrForm &&
            arrForm.map((item, index) => (
              <div key={index} className="assembly_form_card">
                <Form.Item
                  getValueFromEvent={(e) => (e.target ? e.target.value : e)}
                  label={item.title}
                  name={
                    item.field instanceof Array ? item.field[0] : item.field
                  }
                  rules={[{ required: item.required, message: item.message }]}
                >
                  {fieldList(item)}
                </Form.Item>
              </div>
            ))}
        </div>
        <div
          className="ant-modal-footer ant-modal-footer-custom"
          style={footer}
        >
          <button
            onClick={handleClose}
            className="ant-btn ant-btn-default"
          >
            <span>取 消</span>
          </button>
          <button
            // @ts-ignore
            type="primary"
            // @ts-ignore
            htmltype="submit"
            className="ant-btn ant-btn-primary"
          >
            <span>确 定</span>
          </button>
        </div>
      </Form>
    </div>
  );
};

export default forwardRef(AssemblyForm);
