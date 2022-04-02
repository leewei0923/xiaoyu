import AdminFrame from "~/src/components/admin/AdminFrame";
import {
  Tag,
  Button,
  Table,
  message,
  Tooltip,
  Popover,
  Modal,
  Form,
  Input,
} from "antd";
import Link from "next/link";
import { addItem, getItem } from "~/src/utils/localStorage";
import { useEffect, useState } from "react";
import {
  apiGetCommentDetaill, // 获取详细留言板信息
  apiReplayComment, // 回复消息
  apiDelBackComment, // 删除操作
} from "~/src/request/api";
import { timeFormatte } from "~/src/utils/timeFormatte";

export default function Message() {
  //顶层
  const { TextArea } = Input;

  const [userInfo, setUserInfo] = useState([]);
  const [dataList, setDataList] = useState([]);
  // 控制model 显示和隐藏
  const [isModalVisible, setIsModalVisible] = useState(false);
  // commentInfo 评论的关键信息
  const [commentInfo, setCommentInfo] = useState([]);
  // 储存 textArea 内容
  const [textAreaText, setTextArea] = useState("");

  //
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      // console.log(
      //   `selectedRowKeys: ${selectedRowKeys}`,
      //   "selectedRows: ",
      //   selectedRows
      // );
    },
  };

  // 开始加载的时候获取 信息  更新页面
  const fetchData = async () => {
    const { data } = await apiGetCommentDetaill();
    if (data.status == "ok") {
      setDataList(data.info);
    }
  };

  // ---------------------

  // 关闭 model
  const handleCancel = () => {
    // 关闭model
    setIsModalVisible(false);
    setTextArea("");
  };

  // model 提交信息
  const handleOk = async () => {
    const [_id, parentID, commentName] = commentInfo;
    const date = timeFormatte(Date.now() + 28800000).join(" ");
    const commentedID = commentInfo[3] || _id;
    const level = parentID + 1;

    const bacMsg = await apiReplayComment({
      _id: commentedID,
      parentID: level,
      commentName: userInfo[0],
      content: textAreaText,
      commentedName: commentName,
      date,
    });

    if (bacMsg.data.status == "ok") {
      message.success(bacMsg.data.msg);
      handleCancel();
      fetchData();
    } else {
      message.success(bacMsg.data.msg);
    }
  };

  // 操作区
  // 回复
  const onReplay = (info) => {
    const { _id, parentID, commentName, comemntedID, type } = info;
    setCommentInfo([_id, parentID, commentName, comemntedID, type]);
    setIsModalVisible(true);
  };

  // 删除
  const onDelete = async (info) => {
    const { _id, type } = info;
    const backInfo = await apiDelBackComment({ _id, type });
    if (backInfo.data.status == "ok") {
      message.success(backInfo.data.msg);
      fetchData();
    } else {
      message.error("删除失败");
    }
  };

  const artOption = [
    {
      key: "1",
      title: "回复",
      click: onReplay,
      type: "primary",
    },
    {
      key: "2",
      title: "删除",
      click: onDelete,
      type: "danger",
    },
  ];

  const content = (info) =>
    artOption.map((item) => (
      <Button
        type={item.type}
        key={item.key}
        size={`small`}
        onClick={() => item.click(info)}
      >
        {item.title}
      </Button>
    ));

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      ellipsis: true,
      render: (text) => {
        return (
          <Tooltip placement="top" title={text} arrowPointAtCenter key={text}>
            <span>{text}</span>
          </Tooltip>
        );
      },
    },
    {
      title: "昵称",
      dataIndex: "commentName",
      ellipsis: true,
    },
    {
      title: "邮箱",
      dataIndex: "email",
      ellipsis: true,
      render: (text) => {
        return (
          <Tooltip placement="top" title={text} arrowPointAtCenter>
            <span>{text}</span>
          </Tooltip>
        );
      },
    },
    {
      title: "网址",
      dataIndex: "website",
      ellipsis: true,
    },
    {
      title: "ip",
      dataIndex: "ip",
      ellipsis: true,
    },
    {
      title: "内容",
      dataIndex: "content",
      ellipsis: true,
      render: (text) => {
        return (
          <Tooltip placement="top" title={text} arrowPointAtCenter key={text}>
            <span>{text}</span>
          </Tooltip>
        );
      },
    },
    {
      title: "日期",
      dataIndex: "date",
      ellipsis: true,
    },
    {
      title: "操作",
      dataIndex: "options",
      render: (text, info) => (
        <Popover title="更多" trigger="click" content={() => content(info)}>
          <Button type="primary" size="small">
            更多
          </Button>
        </Popover>
      ),
    },
  ];

  // 获取TextArea 的内容

  const getTextAreaText = (e) => {
    // TODO: 防抖
    setTextArea(e.target.value);
  };

  useEffect(() => {
    let isMouted = false;

    const [user, permission] = getItem("userInfo").value.split(" ");
    fetchData();
    if (!isMouted) {
      setUserInfo([user, permission]);
    }

    () => {
      isMouted = true;
    };
  }, []);

  return (
    <AdminFrame>
      <Table
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
        columns={columns}
        dataSource={dataList}
        rowKey={(e) => {
          return e._id;
        }}
        size={"small"}
        pagination={{ pageSize: 10 }}
      />
      {/* model */}
      <Modal
        title={`回复: ${commentInfo[2]}`}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <TextArea
          placeholder="请输入你要回复的内容"
          maxLength={200}
          showCount={true}
          onChange={getTextAreaText}
          value={textAreaText}
        />
      </Modal>
    </AdminFrame>
  );
}
