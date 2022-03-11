import AdminFrame from "~/src/components/admin/adminFrame";
import {
  Table,
  Tag,
  Radio,
  Divider,
  Checkbox,
  Button,
  Modal,
  Input,
  Select,
  Form,
  message,
} from "antd";
import { useState, useEffect, useRef } from "react";
import styles from "~/styles/admin/account.module.scss";
import axios from "axios";
import { use } from "marked";
import { timeFormatte } from "~/src/utils/timeFormatte";

export default function Account() {
  // 操作区

  const onDelete = () => {
    console.log("删除");
  };

  const artOption = [
    {
      key: "1",
      title: "删除",
      click: onDelete,
      type: "danger",
    },
  ];

  // 表格配置

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
    },
    {
      title: "账号",
      dataIndex: "name",
    },
    {
      title: "密码",
      dataIndex: "password",
    },
    {
      title: "创建日期",
      dataIndex: "date",
      render: (text) => timeFormatte(text)[0],
    },
    {
      title: "权限",
      dataIndex: "permission",
    },
    {
      title: "ip",
      dataIndex: "ip",
    },
    {
      title: "平台",
      dataIndex: "platform",
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

  // btn
  const [isModalVisible, setModelVisible] = useState(false);

  const [userName, setUsername] = useState(""); // 用户名
  const [password, setPassword] = useState(""); // 密码
  const [curSelect, setCurSelect] = useState("visitor"); // 选中

  // 打开model
  const onShowModel = () => {
    setModelVisible(true);
  };
  // 关闭 model

  const onCancel = () => {
    setModelVisible(false);
  };

  // TODO: AXIOS

  const onSave = () => {

    if ((userName ?? "").length < 2 || (password ?? "").length < 2) {
      message.error("用户名 或 密码 字数不够, 请重新检查");
    } else {

      const {
        userAgent,
        userAgentData: { platform },
      } = window.navigator;
      axios.post("http://localhost:3001/api/login/insertUser", {
          name: userName,
          password: password,
          permission: curSelect,
          platform,
          userAgent
        })
        .then(function (res) {
          console.log(res);
        })
        .catch(function (err) {
          console.log("出现错误account", err);
        });
    }
  };

  // select 选中
  const getCurSelect = (e) => {
    if (e == "admin") {
      message.warn("选中admin 请慎重!");
    }
    setCurSelect(e);
  };

  // 来自网络set
  const [listData, setDataList] = useState([]);

  const getUsernameText = (e) => {
    setUsername(e.target.value);
  };

  const getPasswordText = (e) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios({
        url: "http://localhost:3001/api/login/getUserInfo",
        method: "get",
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      setDataList(result.data.info);
    };

    fetchData();
  }, []);

  return (
    <AdminFrame>
      <Button type="primary" onClick={() => onShowModel()}>
        添加账号
      </Button>
      <Divider />
      <Table
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
        columns={columns}
        dataSource={listData}
        rowKey={(e) => {
          return e._id;
        }}
      />

      {/* 提示框 */}
      <Modal
        title="添加账号"
        visible={isModalVisible}
        onOk={() => onSave()}
        okText="保存账号"
        cancelText="取消保存"
        onCancel={() => onCancel()}
      >
        <Form>
          <Form.Item label="账号">
            <Input
              name="username"
              onChange={(e) => getUsernameText(e)}
            />
          </Form.Item>

          <Form.Item label="密码">
            <Input
              name="password"
              onChange={(e) => getPasswordText(e)}
            />
          </Form.Item>

          <Form.Item label="权限设置">
            <Select onChange={(e) => getCurSelect(e)} defaultValue="visitor">
              <Select.Option value="visitor">游客</Select.Option>
              <Select.Option value="admin">管理员</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </AdminFrame>
  );
}



