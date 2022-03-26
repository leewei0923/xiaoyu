import AdminFrame from "~/src/components/admin/adminFrame";
import {
  Table,
  Tag,
  Radio,
  Divider,
  Checkbox,
  Button,
  message,
  notification,
} from "antd";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  apiLoadBackCode,
  apiUpdateInfoCode,
  apiDeleteCode,
} from "~/src/request/api";

export default function Code() {
  const [listData, setListData] = useState("");


  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: "提示",
      description:
        "删除成功",
    });
  };

  // 请求数据

  const fetchData = async () => {
    const res = await apiLoadBackCode();
    if (res.data.status == "ok") {
      setListData(res.data.info);
    }
  };

  // 表格操作区

  // 修改
  const onEdit = () => {
    console.log("修改");
  };

  // 删除
  const onDelete = async (v) => {
    openNotificationWithIcon('success')
     await apiDeleteCode({
      _id: v._id,
    });

    fetchData();
  };

  // 撤回返回草稿状态
  const onWithdraw = async (v) => {
    const info = await apiUpdateInfoCode({
      _id: v._id,
      draft: true,
    });
 
    if (info.data.status == "ok") {
      message.success(info.data.msg);
      fetchData();
    }
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
    {
      key: "3",
      title: "撤回",
      click: onWithdraw,
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
          <a href={`${info.link}`} target="_blank" rel="noreferrer">
            {text}
          </a>
        );
      },
    },
    {
      title: "标签",
      dataIndex: "tags",
      render: (text) => {
        return <Tag color={"geekblue"}>{text}</Tag>;
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

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AdminFrame>
      <Table
        columns={columns}
        dataSource={listData}
        rowKey={(e) => {
          return e._id;
        }}
      />
    </AdminFrame>
  );
}
