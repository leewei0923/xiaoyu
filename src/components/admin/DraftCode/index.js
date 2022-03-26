import { Table, Tag, Radio, Divider, Checkbox, Button, message } from "antd";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Index(prop) {
  // const [listData, setListData] = useState("");

  const { listData, onEdit, onDelete, onPost } = prop;

  

  // 表格操作区

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
    {
      key: "3",
      title: "发布",
      click: onPost,
      type: "danger",
      ghost: true,
    },
  ];

  const columns = [
    {
      title: "题目",
      dataIndex: "name",
      render: (text, info) => {
        return (
          <a href={`${info.link}`} target="_blank" rel="noreferrer" key={text}>
            {text}
          </a>
        );
      },
    },
    {
      title: "标签",
      dataIndex: "tags",
      render: (text) => {
        return <Tag color={"geekblue"} key={text}>{text}</Tag>;
      },
    },
    {
      title: "日期",
      dataIndex: "date",
      render: (text) => text,
    },
    {
      title: "操作",
      dataIndex: "options",
      render: (text, info) =>
        artOption.map((item) => (
          <Button
            key={item.key}
            onClick={() => item.click(info)}
            type={item.type}
            size={`small`}
            style={{ margin: `0 5px` }}
            ghost={item.ghost || false}
          >
            {item.title}
          </Button>
        )),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={listData}
      rowKey={(e) => {
        return e._id;
      }}
    />
  );
}
