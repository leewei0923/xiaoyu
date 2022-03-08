import AdminFrame from "~/src/components/admin/adminFrame";
import { Tag, Button, Table } from "antd";
import Link from "next/link";

export default function message() {



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
       title: "昵称",
       dataIndex: "nicknames",
     },
     {
       title: "邮箱",
       dataIndex: "mail",
     },
     {
       title: "网址",
       dataIndex: "url",
     },
     {
       title: "类型",
       dataIndex: "type",
     },
     {
       title: "内容",
       dataIndex: "content",
     },
     {
       title: "日期",
       dataIndex: "date",
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

  return (
    <AdminFrame>
      <Table
        rowSelection={{
          type: 'checkbox',
          ...rowSelection,
        }}
        columns={columns}
        // dataSource={listData}
      />
    </AdminFrame>
  );
}
