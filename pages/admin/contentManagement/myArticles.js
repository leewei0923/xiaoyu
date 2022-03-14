import AdminFrame from "~/src/components/admin/adminFrame";
import { Table, Tag, Radio, Divider, Checkbox, Button } from "antd";
import { useState, useEffect } from "react";
import { generateID } from "~/src/utils/utils";
import axios from "axios";
import Link from "next/link";

const articleListUrl = `http://127.0.0.1:3000/api/articles/list/1`;

export default function MyArticles() {
  const [listData, setListData] = useState("");

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      // console.log(
      //   `selectedRowKeys: ${selectedRowKeys}`,
      //   "selectedRows: ",
      //   selectedRows
      // );
    },
  };

  // 操作区

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
      title: "ID",
      dataIndex: "key",
    },
    {
      title: "名称",
      dataIndex: "slug",
      render: (text) => {
        return (
          <Link href={`/articles/${text}`}>
            <a>{text.split("/")[1]}</a>
          </Link>
        );
      },
    },
    {
      title: "类型",
      dataIndex: "type",
      render: (text) => {
        if (text == "life") {
          return <Tag color={"geekblue"}>生活日常</Tag>;
        } else {
          return <Tag color={"geekblue"}>技术</Tag>;
        }
      },
    },
    {
      title: "创建日期",
      dataIndex: "date",
      render: text => text.join(' ')
    },
    {
      title: "操作",
      dataIndex: "options",
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

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(articleListUrl);

      const { articlesInfoList } = result.data;

      setListData(articlesInfoList);
    };

    fetchData();
  }, []);

  return (
    <AdminFrame>
      <Table
        rowSelection={{
          type: Checkbox,
          ...rowSelection,
        }}
        columns={columns}
        dataSource={listData}
      />
    </AdminFrame>
  );
}
