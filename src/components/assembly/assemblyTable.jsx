import React, {useState, useImperativeHandle, forwardRef} from "react";
import { Table } from "antd";
const AssemblyTable = (props, ref) => {
    const { tableConfig = {} } = props
    const [loading, setLoading] = useState(false);
    const [hightLine, setHightLine] = useState(null)
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [mixinTableConfig, setMixinTableConfig] = useState({
        bordered: true,
        rowKey: "_id", // 表格行 key 的取值
        dataSource: [], //数据数组
        // 设置行属性
        onRow: (record, index) => ({
            onClick: () => {
                setHightLine(record._id)
                tableConfig.onClick && tableConfig.onClick(record, index)
            }
        }),
        // 分页器
        pagination: {
            current: 1,
            pageSize: 8,
            showQuickJumper: true, //是否可以快速跳转至某页
            total: 0, // 数据总数
            showSizeChanger: true, // 是否展示 pageSize 切换器
            // position: ["bottomRight"],
            // 页码或 pageSize 改变的回调，参数是改变后的页码及每页条数
            onChange: (page, pageSize) => {

            },
            // 用于显示数据总量和当前数据顺序
            showTotal: (total, range) => `共${total}条`
        },
        ...tableConfig.table
    })

    // 表格行是否可选择
    const rowSelection = {
        type: "checkbox",
        // 当数据被删除时仍然保留选项的 key
        preserveSelectedRowKeys: true,
        // 指定选中项的 key 数组需要和 onChange 进行配合
        selectedRowKeys,
        onChange: (keys) => setSelectedRowKeys(keys)
        
    }

    // 表格行的类名
    const rowClassName = (record) => record.id === hightLine ? 'ant-table-row-selected' : ''

    //
    return (
        <div className="assembly_table_box">
            <Table
                loading={loading}
                rowClassName={rowClassName}
                rowSelection={rowSelection}
                {...mixinTableConfig}
            />

        </div>
    )
}

export default forwardRef(AssemblyTable)