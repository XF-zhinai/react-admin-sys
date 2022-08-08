import React, {
  useState,
  useImperativeHandle,
  forwardRef,
  useRef,
  useEffect,
} from "react";
import { Table } from "antd";

const AssemblyTable = (props, ref) => {
  const { tableConfig = {} } = props;
  const defaultP = tableConfig.request ? tableConfig.request.data : {};
  const queryParams = useRef(defaultP);
  const [loading, setLoading] = useState(false);
  const [hightLine, setHightLine] = useState(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [mixinTableConfig, setMixinTableConfig] = useState({
    bordered: true,
    rowKey: "_id", // 表格行 key 的取值
    dataSource: [], //数据数组
    // 设置行属性
    onRow: (record, index) => ({
      onClick: () => {
        setHightLine(record._id);
        tableConfig.onClick && tableConfig.onClick(record, index);
      },
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
        getTableData({ pageNum: page, pageSize: pageSize });
      },
      // 用于显示数据总量和当前数据顺序
      showTotal: (total, range) => `共${total}条`,
    },
    ...tableConfig.table,
  });

  // 表格行是否可选择
  const rowSelection = {
    type: "checkbox",
    // 当数据被删除时仍然保留选项的 key
    preserveSelectedRowKeys: true,
    // 指定选中项的 key 数组需要和 onChange 进行配合
    selectedRowKeys,
    onChange: (keys) => setSelectedRowKeys(keys),
  };

  // 表格行的类名
  const rowClassName = (record) =>
    record.id === hightLine ? "ant-table-row-selected" : "";

  // 获取表格数据
  const getTableData = (query = {}) => {
    const {
      pageNum = mixinTableConfig.pagination.current,
      pageSize = mixinTableConfig.pagination.pageSize,
      ...restParams
    } = query;
    queryParams.current = {
      pageSize,
      ...defaultP,
      ...restParams,
      pageNum: query === true ? 1 : pageNum,
    };
    if (tableConfig.request) {
      const _request = window.$http[tableConfig.request.method] || window.$http.get;
      setLoading(true);
      _request({
        url: tableConfig.request.url,
        data: queryParams.current,
      }).then((res) => {
        setLoading(false);
        mixinTableConfig.dataSource = res.data.reverse();
        if (mixinTableConfig.pagination) {
          mixinTableConfig.pagination.total = res.data.total;
          mixinTableConfig.pagination.current = queryParams.current.pageNum;
          mixinTableConfig.pagination.pageSize = queryParams.current.pageSize;
        }
        setMixinTableConfig({ ...mixinTableConfig });
        tableConfig.callback && tableConfig.callback(res.data, setHightLine);
      });
    }
  };

  useEffect(() => {
    getTableData();
  }, []);

  useImperativeHandle(ref, () => ({
    queryParams,
    selectedRowKeys,
    getTableData,
  }));

  return (
    <div className="assembly_table_box">
      <Table
        loading={loading}
        rowClassName={rowClassName}
        rowSelection={rowSelection}
        {...mixinTableConfig}
      />
    </div>
  );
};

export default forwardRef(AssemblyTable);
