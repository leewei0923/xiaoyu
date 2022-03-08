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
import styles from "~/styles/admin/gallery.module.scss";
import { InfoCircleOutlined, UploadOutlined } from "@ant-design/icons";



export default function Gallery() {
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      // Column configuration not to be checked
      name: record.name,
    }),
  };

  // 使用model 
   const [isModalVisible, setIsModalVisible] = useState(false);

   const handleOk = () => {
     setIsModalVisible(false);
     console.log("确定");
   };

   const handleCancel = () => {
     setIsModalVisible(false);
     console.log("取消")
   };

  const onCreatePhoto = () => {
    setIsModalVisible(true);
  }

  // 表格设置

  const [form] = Form.useForm();
  const {TextArea} = Input;


  // 图片上传

  const [fileList, setFileList] = useState([
    {
      uid: "-1",
      name: "xxx.png",
      status: "done",
      url: "http://www.baidu.com/xxx.png",
    },
  ]);

  const handleChange = (info) => {
    let fileList = [...info.fileList];

    // 1. Limit the number of uploaded files
    // Only to show two recent uploaded files, and old ones will be replaced by the new
    fileList = fileList.slice(-2);

    // 2. Read from response and show file link
    fileList = fileList.map(file => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.url;
      }
      return file;

    })

    setFileList(fileList)
  }


  const props = {
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    onChange: handleChange,
    multiple: false,
  };


  // 按钮设置

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
      render: (text) => <a>{text}</a>,
    },
    {
      title: "图片地址",
      dataIndex: "url",
    },
    {
      title: "描述",
      dataIndex: "desc",
    },
    {
      title: "图片故事",
      dataIndex: "content",
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
      <div className={styles.options}>
        <Button type="primary" onClick={() => onCreatePhoto()}>
          添加图片
        </Button>
      </div>

      <Divider />

      <Table
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
        columns={columns}
        // dataSource={data}
      />

      {/* Model */}

      <Modal
        title="添加图片"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="保存"
        cancelText="取消"
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{ requiredMarkValue: "required" }}
        >
          <Form.Item
            label="图片地址"
            required
            tooltip="请填写正确的图片网络地址例如:https://qi.7miaoyu.com/"
          >
            <Input placeholder="网络地址" />
          </Form.Item>

          <Form.Item
            label="描述"
            tooltip={{
              title: "适用于网页读屏软件",
              icon: <InfoCircleOutlined />,
            }}
          >
            <Input placeholder="图片描述" />
          </Form.Item>

          <Form.Item label="图片故事">
            <TextArea rows={4} placeholder="限制140个字" maxLength={140} />
          </Form.Item>

          <Form.Item
            label="点击上传图片"
            tooltip={{
              title: "如果上传了图片,就不需要填写图片地址",
              icon: <InfoCircleOutlined />,
            }}
          >
            <Upload {...props} fileList={fileList}>
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </AdminFrame>
  );
}
