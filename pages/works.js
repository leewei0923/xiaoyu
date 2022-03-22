import React from "react";
import Footer from "~/src/components/Footer/Footer";
import Headers from "~/src/components/Header/Header";
import Navigationtop from "~/src/components/NavigationTop/NavTop";
import styles from "~/styles/works.module.scss";

export default function works() {
  return (
    <>
      <Headers />
      <div className={styles.container}>
        <iframe
        loading="lazy"
        src="http://127.0.0.1:3001/works/"
        width="99%"
        height="100%"
        frameBorder="0"
      ></iframe>
      </div>
      
      <Footer></Footer>
    </>
  );
}
