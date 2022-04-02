import AdminFrame from "~/src/components/admin/AdminFrame";
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
  message,
} from "antd";
import { useEffect, useState } from "react";
import styles from "~/styles/admin/gallery.module.scss";
import { InfoCircleOutlined, UploadOutlined } from "@ant-design/icons";
import { timeFormatte } from "~/src/utils/timeFormatte";
import { apiAddPhoto, apiDelPhoto, apiLoadPhoto } from "~/src/request/api";
import { getItem } from "~/src/utils/localStorage";

export default function Gallery() {
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const [photosInfo, setPhotoInfo] = useState([]);
  // 使用model
  const [isModalVisible, setIsModalVisible] = useState(false);
  // 获取数据 更新页面

  const fetchData = async () => {
    const photos = await apiLoadPhoto();

    if (photos.data.status == "ok") {
      setPhotoInfo(photos.data.info);
    } else {
      message.error("加载出错");
    }
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const onCreatePhoto = () => {
    const [user, permission] = getItem("userInfo").value.split(" ");
    if(permission !== 'admin') {
      message.warn("权限不足");
      return;
    }
    setIsModalVisible(true);
  };

  const onClear = () => {
    form.resetFields();
  };

  // 表格设置

  // 按钮设置

  const onEdit = (info) => {
    const { _id } = info;
    const [user, permission] = getItem("userInfo").value.split(" ");
    if (permission == "admin") {
      message.success("还未开发");
    } else {
      message.warn("权限不足");
    }
  };

  const onDelete = async (info) => {
    const { _id } = info;
    const [user, permission] = getItem("userInfo").value.split(" ");
    if (permission == "admin") {
      const backInfo = await apiDelPhoto({ _id });

      if (backInfo.data.status == "admin") {
        message.success(backInfo.data.msg);
        fetchData();
      } else {
        message.error("删除失败");
      }
    } else {
      message.warn("权限不足");
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
  ];

  const columns = [
    {
      title: "id",
      dataIndex: "_id",
      render: (text) => <a>{text}</a>,
      ellipsis: true,
    },
    {
      title: "图片地址",
      dataIndex: "photoUrl",
      ellipsis: true,
    },
    {
      title: "描述",
      dataIndex: "photoDescrption",
      ellipsis: true,
    },
    {
      title: "图片故事",
      dataIndex: "photoStory",
      ellipsis: true,
    },
    {
      title: "日期",
      dataIndex: "date",
      ellipsis: true,
    },
    {
      title: "操作",
      dataIndex: "action",
      render: (text, info) =>
        artOption.map((item) => (
          <Button
            key={item.key}
            onClick={() => item.click(info)}
            type={item.type}
            size={`small`}
            style={{ margin: `0 5px` }}
          >
            {item.title}
          </Button>
        )),
    },
  ];

  // 保存图片

  const onSavePhoto = async (e) => {
    const { des, story, url } = e;
    const date = timeFormatte(Date.now() + 28800000).join(" ");
    const backInfo = await apiAddPhoto({
      photoUrl: url,
      photoDescrption: des,
      photoStory: story,
      date,
    });
    if (backInfo.data.status == "ok") {
      message.success(backInfo.data.msg);
      form.resetFields();
      fetchData();
    }
  };

  useEffect(() => {
    let isMouted = false;
    if (!isMouted) {
      fetchData();
    }

    () => {
      isMouted = true;
    };
  }, []);

  return (
    <AdminFrame>
      <div className={styles.options}>
        <Button type="primary" onClick={() => onCreatePhoto()}>
          添加图片
        </Button>
      </div>

      <Divider />

      <Table
        // rowSelection={{
        //   type: "checkbox",
        //   ...rowSelection,
        // }}
        rowKey={(e) => {
          return e._id;
        }}
        columns={columns}
        dataSource={photosInfo}
      />

      {/* Model */}

      <Modal
        title="添加图片"
        visible={isModalVisible}
        onOk={() => onClear()}
        onCancel={() => handleOk()}
        okText="清除所有"
        cancelText="关闭"
      >
        <Form form={form} layout="vertical" onFinish={onSavePhoto}>
          <Form.Item
            label="图片地址"
            required
            tooltip="请填写正确的图片网络地址例如:https://qi.7miaoyu.com/"
            name="url"
          >
            <Input placeholder="网络地址" />
          </Form.Item>

          <Form.Item
            label="描述"
            tooltip={{
              title: "适用于网页读屏软件",
              icon: <InfoCircleOutlined />,
            }}
            name="des"
          >
            <Input placeholder="图片描述" />
          </Form.Item>

          <Form.Item label="图片故事" name="story">
            <TextArea rows={4} placeholder="限制140个字" maxLength={140} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              保存
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </AdminFrame>
  );
}
