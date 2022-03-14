import AdminFrame from "~/src/components/admin/adminFrame";
import styles from "~/styles/admin/mine.module.scss";
import { Button, Divider, Modal, Input } from "antd";
import { useState } from "react";

export default function Mine() {

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <AdminFrame>
      <main className={styles.CenterConatiner}>
        <div className={styles.userCard}>
          <div className={styles.avator}></div>
          <div className={styles.userInfo}>
            <p className={styles.nickName}>小黄人向前冲</p>
            <p className={styles.motto}>
              <span>-Motto: </span>人生无常,就像大肠包小肠
            </p>
            <p className={styles.company}>
              <span>-Company: </span>@字节跳动
            </p>
            <p className={styles.email}>
              <span>-Email: </span>2955538482@qq.com
            </p>
          </div>

          <div className={styles.options}>
            <Button ghost type="primary" onClick={() => showModal()}>
              编辑个人资料
            </Button>

            <Button style={{ marginLeft: "30px" }} size="small" type="danger">
              退出
            </Button>
          </div>
        </div>

        <Divider />

        <div className={styles.accountInfo}>
          <p className={styles.history}>
            <span>加入于</span>2021-07-04
          </p>
        </div>
      </main>

      {/* 弹出框 */}

      <Modal
        title="修改资料"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        
      </Modal>
    </AdminFrame>
  );
}
