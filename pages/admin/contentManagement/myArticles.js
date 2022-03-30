import AdminFrame from "~/src/components/admin/adminFrame";
import { Table, Tag, Radio, Divider, Checkbox, Button, message } from "antd";
import { useState, useEffect } from "react";
import { generateID } from "~/src/utils/utils";
import Link from "next/link";
import { apiArticleList, apiSyncArticle } from "~/src/request/api";

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

   const fetchData = async () => {
     const result = await apiArticleList();
     const { info } = result.data;

     setListData(info);
   };

  const syncArticles = async () => {
    const info = await apiSyncArticle();
    if (info.data.status == "ok") {
      message.success(info.data.msg);
      fetchData(); 
    } else {
      message.success(info.data.msg);
    }
  };

  // 表格操作区

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
      ellipsis: true,
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
      render: (text) => text.join(" "),
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
  
    fetchData();
  }, []);

  return (
    <AdminFrame>
      <div>
        <Button type="primary" ghost onClick={() => syncArticles()}>
          同步文章进数据库
        </Button>
      </div>
      <hr style={{ marign: "10px 0", height: "10px" }} />
      <Table
        rowSelection={{
          type: Checkbox,
          ...rowSelection,
        }}
        columns={columns}
        dataSource={listData}
        pagination={{ defaultPageSize: 7 }}
      />
    </AdminFrame>
  );
}
