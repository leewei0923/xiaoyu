import AdminFrame from "~/src/components/admin/AdminFrame";
import styles from "~/styles/admin/mine.module.scss";
import {
  Button,
  Divider,
  Modal,
  Input,
  Form,
  InputNumber,
  Tooltip,
} from "antd";
import { useState, useEffect, useRef } from "react";
import { decodeBase64 } from "~/src/utils/utils";
import {
  apiInsertPersonalInfo,
  apiPersonalInfo,
  apiLoadCommitCount,
} from "~/src/request/api";
import { timeFormatte } from "~/src/utils/timeFormatte";
import { message } from "antd";
import { useRouter } from "next/router";
import CalendarGraph from "~/src/components/CalendarGraph/index";

export default function Mine() {
  // 全局路由

  const router = useRouter();

  const [isModalVisible, setIsModalVisible] = useState(false);

  // 用户的个性信息
  const [personalInfo, setPersonalInfo] = useState({});

  // 全局的loginname 登录账号的name

  const [loginName, setLoginName] = useState("");

  const [commitCount, setCommitCount] = useState([]);

  /**
   * 2022.03.15
   * 获取数据
   */
  const fetchData = async function fetchPersonalData(n) {
    apiPersonalInfo({ name: n }).then((res) => {
      if (res.data.status == "ok") {
        setPersonalInfo(res.data.info);
      }
    });
    const info = await apiLoadCommitCount();
    if (info.data.status == "ok") {
      setCommitCount(info.data.info);
    }
  };

  /**
   * 2022.03.15
   * 打开model
   */

  const showModal = () => {
    setIsModalVisible(true);
  };

  /**
   * 2022.03.15
   * 取消保存
   */
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  /**
   * 2022.03.15
   * 提交保存
   */
  const onSave = (values) => {
    const { company, email, motto, nickname, website } = values.user;

    apiInsertPersonalInfo({
      name: loginName,
      company: company,
      email: email,
      motto: motto,
      nickname: nickname,
      website: website,
    }).then((res) => {
      if (res.data.status === "ok") {
        message.success("添加成功");
        fetchData(loginName);
      } else {
        message.error("添加失败");
      }
    });
  };

  /**
   * 2022.03.15
   * 退出
   */

  const logout = function loginOut() {
    if (confirm("确定要退出?")) {
      localStorage.removeItem("token");
      router.push("/admin/login");
    }
  };

  useEffect(() => {
    let isMouted = false;
    /**
     * 2022.03.15
     * 请求网络
     */

    const token = localStorage.getItem("token");
    if (token) {
      const isLoginName = JSON.parse(decodeBase64(token.split(".")[1])).data;
      if (!isMouted) {
        setLoginName(isLoginName);
        fetchData(loginName);
      }
    }

    return () => {
      isMouted = true;
    };
  }, [loginName]);

  return (
    <AdminFrame>
      <main className={styles.CenterConatiner}>
        <div className={styles.userCard}>
          <div className={styles.avator}></div>
          <div className={styles.userInfo}>
            <p className={styles.nickName}>{personalInfo.nickname ?? ""}</p>
            <p className={styles.motto}>
              <span>-Motto: </span>
              <Tooltip title={personalInfo.motto ?? ""} arrowPointAtCenter>
                {personalInfo.motto ?? ""}
              </Tooltip>
            </p>
            <p className={styles.company}>
              <Tooltip title={personalInfo.company ?? ""} arrowPointAtCenter>
                <span>-Company: </span>@{personalInfo.company ?? ""}
              </Tooltip>
            </p>
            <p className={styles.email}>
              <span>-Email: </span>
              {personalInfo.email ?? ""}
            </p>

            <p className={styles.website}>
              <span>-Website: </span>
              <a href={personalInfo.website ?? "#"}>
                {personalInfo.website ?? ""}
              </a>
            </p>
          </div>

          <div className={styles.options}>
            <Button ghost type="primary" onClick={() => showModal()}>
              编辑个人资料
            </Button>

            <Button
              style={{ marginLeft: "30px" }}
              size="small"
              type="danger"
              onClick={() => logout()}
            >
              退出
            </Button>
          </div>
        </div>

        <Divider />

        <div className={styles.accountInfo}>
          <p className={styles.history}>
            <span>加入于</span>
            {timeFormatte(new Date(personalInfo.date || Date.now()))[0] ?? ""}
          </p>
        </div>
      </main>
      {/* 弹出框 */}
      <Modal
        title="编辑个人资料"
        visible={isModalVisible}
        onCancel={handleCancel}
      >
        <Form name="nest-messages" onFinish={onSave}>
          <Form.Item name={["user", "nickname"]} label="昵称">
            <Input placeholder={personalInfo.nickname ?? ""} />
          </Form.Item>
          <Form.Item name={["user", "email"]} label="Email">
            <Input placeholder={personalInfo.email ?? ""} />
          </Form.Item>
          <Form.Item name={["user", "motto"]} label="motto">
            <Input
              showCount
              maxLength={20}
              placeholder={personalInfo.motto ?? ""}
            />
          </Form.Item>

          <Form.Item name={["user", "company"]} label="company">
            <Input placeholder={personalInfo.company ?? ""} />
          </Form.Item>

          <Form.Item name={["user", "website"]} label="website">
            <Input placeholder={personalInfo.website ?? ""} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              保存
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <CalendarGraph commitData={commitCount} />
    </AdminFrame>
  );
}
