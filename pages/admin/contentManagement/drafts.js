import AdminFrame from "~/src/components/admin/adminFrame";
import {
  Table,
  Radio,
  Divider,
  Button,
  Checkbox,
  Modal,
  Form,
  Input,
  Upload,
} from "antd";
import { useState } from "react";

export default function drafts() {
  // 按钮设置

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      // console.log(
      //   `selectedRowKeys: ${selectedRowKeys}`,
      //   "selectedRows: ",
      //   selectedRows
      // );
    },
  };

  const onEdit = () => {
    console.log("修改");
  };

  const onDelete = () => {
    console.log("删除");
  };

  const artOption = [
    {
      key: "1",
      title: "修改",
      click: onEdit,
      type: "primary",
    },
    {
      key: "2",
      title: "删除",
      click: onDelete,
      type: "danger",
    },
  ];

  const columns = [
    {
      title: "id",
      dataIndex: "id",
    },
    {
      title: "名称",
      dataIndex: "names",
    },
    {
      title: "日期",
      dataIndex: "date",
    },
    {
      title: "类型",
      dataIndex: "type",
    },
    {
      title: "标签",
      dataIndex: "tags",
    },
    {
      title: "操作",
      dataIndex: "action",
      render: () =>
        artOption.map((item) => (
          <Button
            key={item.key}
            onClick={item.click}
            type={item.type}
            size={`small`}
            style={{ margin: `0 5px` }}
          >
            {item.title}
          </Button>
        )),
    },
  ];

  return (
    <AdminFrame>
      <Table
        rowSelection={{
          type: Checkbox,
          ...rowSelection,
        }}
        columns={columns}
        // dataSource={listData}
      />
    </AdminFrame>
  );
}
