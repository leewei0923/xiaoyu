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
import { timeFormatte } from "~/src/utils/timeFormatte";
import { apiAccountUser, apiInsertUser, apiOndelete } from "~/src/request/api";
import { decodeBase64 } from "~/src/utils/utils";
import { enCode, deCode } from "~/src/utils/crypto";


export default function Account() {
  /**
   * 全局
   *
   */
  // name: 执行人(已登录人) name 权限 permission
  const [userInfo, setUserInfo] = useState(''); 
  const [name, permission] = decodeBase64(userInfo).split(" ");

  /**----------------------- */

  /**
   * 用于用户名获取请求网络
   */
  const fetchData = function fetchUserData() {
    // 集成化 api 管理获取用户账号资料
    apiAccountUser().then((res) => {
      setDataList(res.data.info);
    });
  };

  // 操作区

  const onDelete = (e) => {
    const { _id, name: nameDelete } = e;

    if (permission === "admin") {
      if (nameDelete == name) {
        message.warn("无法执行该操作!");
        return;
      }
      // 执行删除用户
      apiOndelete({ deleteContent: [{ _id, nameDelete }], name: name })
        .then((res) => {
          const { status } = res.data;
          if (status == "ok") {
            message.success("删除成功");
            // 调用请求网络 刷新页面
            fetchData();
          }
        })
        .catch((err) => console.log("account 52", err));
    } else {
      message.warn("权限不够, 无法执行该操作");
    }
    // api 请求
  };

  const artOption = [
    {
      key: "1",
      title: "删除",
      click: onDelete,
      type: "danger",
    },
  ];

  // 表格前checkbox 选中事件

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
  };

  // 表格表头
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
      render: (text, record) =>
        artOption.map((item) => (
          <Button
            key={item.key}
            onClick={() => item.click(record)}
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
    if (permission !== "admin") {
      message.warn("权限不够");
      return;
    } else {
      setModelVisible(true);
    }
  };
  // 关闭 model

  const onCancel = () => {
    // 内容初始化
    setUsername("");
    setPassword("");
    setCurSelect("visitor");
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

      // api 添加用户资料
      apiInsertUser({
        name: userName,
        password: enCode(password),
        permission: curSelect,
        platform,
        userAgent,
        date: timeFormatte(Date.now() + 8 * 3600 *1000).join(' '),
      }).then((res) => {
        const { status, msg } = res.data;
        if (status == "ok") {
          message.success(msg);
          // 内容初始化
          setUsername("");
          setPassword("");
          setCurSelect("visitor");
          fetchData();
        } else {
          message.error(msg ?? "添加失败");
        }
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
    let isMouted = false;
    if (!isMouted) {
      fetchData();
      setUserInfo(localStorage.getItem("userInfo"));
    }
    

    return () => {
      isMouted = true;
    };
  }, []);

  return (
    <AdminFrame>
      <Button type="primary" onClick={() => onShowModel()}>
        添加账号
      </Button>

      <Button
        type="danger"
        onClick={() => onShowModel()}
        style={{ margin: "0 10px" }}
      >
        批量删除
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
              value={userName}
              onChange={(e) => getUsernameText(e)}
            />
          </Form.Item>

          <Form.Item label="密码">
            <Input
              name="password"
              value={password}
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
