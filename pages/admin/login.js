import { useRef } from "react";
import Navigationtop from "~/src/components/NavigationTop/NavTop";
import Footer from "~/src/components/Footer/Footer";
import styles from "~/styles/admin/login.module.scss";

export default function Login() {
  const username = useRef(null);
  const password = useRef(null);

  const getText = () => {
    console.log(username.current.value, password.current.value)
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
          <button className={styles.loginBtn} onClick={() => getText()}>
            登录
          </button>
        </div>
      </section>
      <Footer></Footer>
    </>
  );
}
