import React, { useState, forwardRef } from "react";
import { Tabs } from "antd";
import AssemblyForm from "./assemblyForm";
import { deepCopy } from "../../utils/global";
import "../css/components.scss";
const AssemblyTabs = (props, ref) => {
  const { successForm } = props;
  let tabsArr = [];
  tabsArr.push(props.form1, props.form2);

  // 表单确认
  const successFn = (data) => {
    successForm(data);
  };
  return (
    <div className="assembly_tabs_box">
      <Tabs defaultActiveKey="0" destroyInactiveTabPane={true} {...props.opt}>
        {tabsArr.map((item, index) => (
          <Tabs.TabPane tab={item.tab} key={index}>
            <AssemblyForm {...item} ref={ref} successForm={successFn} />
          </Tabs.TabPane>
        ))}
      </Tabs>
    </div>
  );
};

export default forwardRef(AssemblyTabs);
