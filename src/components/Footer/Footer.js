import styles from "./footer.module.scss";
import Link from "next/link";
import { baseNav, otherOptions } from "../../utils/navigatorConfig";
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.nav}>
        <section className={styles.leftContainer}>
          {baseNav.map((item) => {
            return (
              <p key={item.url} className={styles.link}>
                <Link href={item.url}>
                  <a className={styles.a}>{item.text}</a>
                </Link>
              </p>
            );
          })}
        </section>
        <section className={styles.rightContainer}>
          {otherOptions.map((item) => {
            return (
              <p key={item.url} className={styles.link}>
                <Link href={item.url}>
                  <a className={styles.a}>{item.text}</a>
                </Link>
              </p>
            );
          })}
        </section>
      </div>

      <p className={styles.statement}>
        ©2022, content by Weiwei. All Rights Reserved. The Website by leewei.
      </p>
      <p className={styles.beian}>
        <Link href="https://beian.miit.gov.cn">
          <a className={styles.a}>皖ICP备20004665号-2</a>
        </Link>
      </p>
    </footer>
  );
}
