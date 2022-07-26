import React, { useState, useImperativeHandle, forwardRef } from "react";
import { Modal, Spin } from "antd";
import AssemblyForm from "./assemblyForm";
import AssemblyTabs from "./assemblyTabs";

const AssemblyModal = (props, ref) => {
  const [isVisible, setVisible] = useState({});
  const { title, successFn } = props;
  const arrModal = Array.isArray(props.modelType)
    ? props.modelType
    : [props.modelType];

  // 给父组件传递方法
  useImperativeHandle(ref, () => ({
    openModal,
    closeModal,
  }));

  // 打开模态框：title-标题 data-父组件的数据 type-是否只读
  const openModal = (title, data, type) => {
    setVisible({ visible: true, loading: false, title, data, type });
  };

  // 关闭模态框
  const closeModal = () => {
    setVisible({ visible: false, loading: false });
  };

  const handleCancel = () => {
    closeModal();
  };

  // 表单确认
  const successForm = (data) => {
    setVisible({ visible: true, loading: true });
    successFn(data);
  };

  // 模态框里的表单设置
  const modalList = (item) => {
    switch (item.type) {
      case "form":
        return (
          <AssemblyForm
            {...item}
            ref={ref}
            // @ts-ignore
            readOnly={isVisible.type}
            // @ts-ignore
            initialValues={isVisible.data}
            successForm={successForm}
          />
        );
      case "tabs":
        return (
          <AssemblyTabs
            {...item}
            ref={ref}
            // @ts-ignore
            initialValues={isVisible.data}
            successForm={successForm}
          />
        )
      default:
        break;
    }
  };

  return (
    <div className="assembly_modal_box">
      <Modal
        width={600}
        // @ts-ignore
        visible={isVisible.visible}
        maskClosable={false}
        onCancel={handleCancel}
        destroyOnClose={true}
        forceRender={true}
        footer={null}
        title={
          title
            ? title
            : // @ts-ignore
            isVisible.title === "add"
            ? "新增"
            : // @ts-ignore
            isVisible.title === "edit"
            ? "编辑"
            : "详情"
        }
        {...props.modelType.opt}
      >
        <Spin
          // @ts-ignore
          spinning={isVisible.loading}
        >
          {isVisible !== {}
            ? arrModal.map((item, index) => (
                <div key={index}>{modalList(item)}</div>
              ))
            : ""}
        </Spin>
      </Modal>
    </div>
  );
};

export default forwardRef(AssemblyModal);
