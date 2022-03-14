import { useEffect, useRef } from "react";
import Navigationtop from "~/src/components/NavigationTop/NavTop";
import Footer from "~/src/components/Footer/Footer";
import styles from "~/styles/admin/login.module.scss";
import axios from "axios";
import { message } from "antd";
import { timeFormatte } from "~/src/utils/timeFormatte";
import { useRouter } from "next/router";
import { decodeBase64, encodeBase64 } from "~/src/utils/utils";
import { apiLoginIn } from "~/src/request/api";
import { useDispatch, useSelector } from "react-redux";
import { changeUserName } from "~/src/store/action";

export default function Login() {

  // next 路由
  const router = useRouter();
  const dispatch = useDispatch();


  // ref
  const username = useRef(null);
  const password = useRef(null);

  // 从redux 获取
  const loginName = useSelector((state) => {
    return state.changeLoginUserName.userName;
  });

  const onLogin = () => {
    const name = username.current.value;
    const pwd = password.current.value;
    apiLoginIn({
      name: name,
      password: pwd,
    })
      .then(function (res) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem(
          "token-date",
          timeFormatte(Date.now() + 28800000).join(" ")
        );
        localStorage.setItem(
          "userInfo",
          encodeBase64(res.data.name + " " + res.data.permission)
        );
        if (res.data.status == "ok") {
          message.success(`欢迎 ${res.data.name}`);
          dispatch(changeUserName(res.data.name));
          router.push("/admin/");
        } else {
          message.warn("登录失败");
        }
      })
      .catch(function (err) {
        console.log("出现错误account", err);
      });
  };


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const tokenName = JSON.parse(decodeBase64(token.split(".")[1])).data;
      if (loginName == tokenName) {
        router.push("/admin");
        
      }
    }
  }, [loginName, router]);

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
          <button className={styles.loginBtn} onClick={() => onLogin()}>
            登录
          </button>
        </div>
      </section>
      <Footer></Footer>
    </>
  );
}

 