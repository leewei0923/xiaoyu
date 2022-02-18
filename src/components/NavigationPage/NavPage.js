import styles from "./navigationPage.module.scss";
import Image from "next/image";
import logo from "../../../public/images/icons/logo.png";
import Link from "next/link";
import { baseNav, otherOptions } from "../../utils/navigatorConfig";
import { socialLink } from "../../utils/navigatorConfig";
import classnames from "classnames";

export default function Navpage(props) {
  const { isNavPageHide, navPageToggle } = props;

  let navPageContainer = classnames(
    {
      [styles.InVisible]: isNavPageHide,
      [styles.Visible]: !isNavPageHide,
    },
    styles.navContainer
  );

  return (
    <nav className={navPageContainer}>
      <div className={styles.header}>
        <div className={styles.logo}>
          <Image
            src={logo}
            layout="responsive"
            objectFit="contain"
            alt="logo"
          ></Image>
        </div>

        <span className={styles.closeBtn} onClick={navPageToggle}></span>
      </div>

      <div className={styles.mainContent}>
        <div className={styles.basePage}>
          {baseNav.map((item) => {
            return (
              <p key={item.url} className={styles.link}>
                <Link href={item.url}>
                  <a className={styles.a}>{item.text}</a>
                </Link>
              </p>
            );
          })}
        </div>

        <div className={styles.extensionPage}>
          {otherOptions.map((item) => {
            return (
              <p key={item.url} className={styles.link}>
                <Link href={item.url}>
                  <a className={styles.a}>{item.text}</a>
                </Link>
              </p>
            );
          })}
        </div>
      </div>

      <div className={styles.footer}>
        {socialLink.map((item) => {
          return (
            <Link href={"/aas"} key={item.text}>
              <a>
                <Image
                  src={item.img}
                  alt={item.text}
                  width="30"
                  height="30"
                ></Image>
              </a>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
