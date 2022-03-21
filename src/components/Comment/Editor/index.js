/**
 * 回复评论组件
 */

import React, { useEffect, useState } from "react";
import styles from "./editor.module.scss";
import { Form, Input, Button, Checkbox, Popover } from "antd";
import { MehOutlined } from "@ant-design/icons";
import { generateID, encodeBase64, decodeBase64 } from "~/src/utils/utils";
import { timeFormatte } from "~/src/utils/timeFormatte";
import { apiGetCommentInfo, apiInsertComment } from "~/src/request/api";
import { message } from "antd";


export default function Index(props) {
  const { TextArea } = Input;
  const { fetchData } = props;
  const [form] = Form.useForm();
  const [subUser, setSubUser] = useState([]);

  /**
   * 提交完当前信息后, 成为永久保存的数据, 填写昵称 , 网站的信息都隐藏
   */
  const HideMenu = () => {
    if (localStorage.getItem("nickname")) {
      let nickname = decodeBase64(localStorage.getItem("nickname"));
      let email = decodeBase64(localStorage.getItem("email"));
      let website = decodeBase64(localStorage.getItem("website"));
      if (nickname && email && website) {
        setSubUser([nickname, email, website]);
      } else {
        setSubUser([]);
      }
    }
  };

  /**
   * 提交评论
   * @param {*} values 
   * @returns 
   */

  const onSubmit = (values) => {

  
    const nickname = values.nickname || subUser[0];
    const email = values.email || subUser[1]; 
    const website = values.website || subUser[2];
    const { content } = values;
    if (
      typeof nickname != "string" ||
      typeof email != "string" ||
      typeof content != "string" ||
      typeof website != "string"
    ) {
      message.warn("似乎没有输入数据，请重新输入。");
      return;
    }

    const userId = generateID(nickname + email);
    const date = timeFormatte(Date.now() + 28800000).join(" ");

    apiInsertComment({
      commentName: nickname,
      email: email,
      website,
      content,
      date,
      userID: userId,
    }).then((res) => {
      const { status, message: msg } = res.data;
      if (status == "ok") {
        message.success(msg);
      } else {
        message.error("添加失败");
      }
    });

    // TODO: 需要进行优化
    localStorage.setItem("nickname", encodeBase64(nickname));
    localStorage.setItem("email", encodeBase64(email));
    localStorage.setItem("website", encodeBase64(website));
    localStorage.setItem("userID", encodeBase64(userId));
    fetchData();
    HideMenu()
    form.resetFields();
  };

  // const put = (e) => {
  //   setTextValue(e.target.innerHTML);

  // };
  // const addText = (e) => {
  //   setTextValue(textValue + e.target.value)
  // }

  // const content = (
  //   <div onClick={put}>
  //     <span>😀</span>
  //     <span>😁</span>
  //     <span>😂</span>
  //     <span>🤣</span>
  //     <span>😃</span>
  //     <span>😄</span>
  //     <span>😅</span>
  //     <span>😆</span>
  //     <span>😉</span>
  //     <span>😊</span>
  //     <span>😋</span>
  //     <span>😎</span>
  //     <span>😍</span>
  //     <span>😘</span>
  //   </div>
  // );
  const onLogout = () => {
    localStorage.removeItem("nickname");
    localStorage.removeItem("email");
    localStorage.removeItem("website");
    localStorage.removeItem("userID");
    setSubUser([])
  }
  



  useEffect(() => {
    let isMouted = false;
    if (!isMouted) {
      HideMenu();
    }

    () => {
      isMouted = true;
    };
  }, []);

  return (
    <div className={styles.container}>
      <p className={styles.title}>评论</p>
      <Form
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 16 }}
        onFinish={onSubmit}
        form={form}
      >
        <div className={styles.personalInfo}>
          <Form.Item label="昵称" name="nickname">
            <Input
              placeholder={subUser[0] ?? "请输入你的昵称"}
              disabled={subUser.length < 3 ? false : true}
            />
          </Form.Item>
          <Form.Item label="邮箱" name="email">
            <Input
              placeholder={subUser[1] ?? "请输入你的邮箱"}
              disabled={subUser.length < 3 ? false : true}
            />
          </Form.Item>

          <Form.Item label="网址" name="website">
            <Input
              placeholder={subUser[2] ?? "请输入你的网址"}
              disabled={subUser.length < 3 ? false : true}
            />
          </Form.Item>

          <Form.Item name="logout">
            <Button
              type="danger"
              onClick={() => onLogout()}
              style={{ display: subUser.length < 3 ? "none" : "" }}
            >退出</Button>
          </Form.Item>
        </div>

        <div className={styles.edit}>
          <Form.Item name="content" wrapperCol={{ span: 23 }}>
            <TextArea
              rows={3}
              placeholder="请输入你要评论的内容"
              allowClear
              maxLength={140}
              showCount={true}
              autoSize={true}
            />
          </Form.Item>
        </div>

        <div className={styles.options}>
          {/* <Form.Item wrapperCol={{ offset: 0, span: 16 }}>
            <Popover content={content} title="Title" trigger="click">
              <Button icon={<MehOutlined />} />
            </Popover>
          </Form.Item> */}
          <Form.Item wrapperCol={{ span: 16 }}>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
}
