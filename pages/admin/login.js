import { useRef } from "react";
import Navigationtop from "~/src/components/NavigationTop/NavTop";
import Footer from "~/src/components/Footer/Footer";
import styles from "~/styles/admin/login.module.scss";
import axios from "axios";
import { message } from "antd";

export default function Login() {
  const username = useRef(null);
  const password = useRef(null);

  const getText = () => {
    const name = username.current.value;
    const pwd = password.current.value;
    axios
      .post("http://localhost:3001/api/login/loginIn", {
        name: name,
        password: pwd,
      })
      .then(function (res) {
        localStorage.setItem("token", res.data.token);
        if (res.data.status == "ok") {
          message.success("登录成功");
        } else {
          message.warn("登录失败");
        }
      })
      .catch(function (err) {
        console.log("出现错误account", err);
      });
  };
  return (
    <>
      <Navigationtop></Navigationtop>
      <section className={styles.loginContainer}>
        <div className={styles.form}>
          <p>小鱼管理 登录 / Login</p>
          <input
            type="text"
            placeholder="用户名"
            className={styles.input}
            ref={username}
          />
          <input
            type="password"
            placeholder="密码"
            ref={password}
            className={styles.input}
          />
          {console.log(process.env.NODE_ENV)}
          <button className={styles.loginBtn} onClick={() => getText()}>
            登录
          </button>
        </div>
      </section>
      <Footer></Footer>
    </>
  );
}
