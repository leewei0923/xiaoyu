import Footer from "~/src/components/Footer/Footer"
import Headers from "~/src/components/Header/Header"
import Navigationtop from "~/src/components/NavigationTop/NavTop"
import styles from "~/styles/messagebook.module.scss"

export default function messagebook() {
  return (
   <>
     <Headers></Headers>
     <Navigationtop></Navigationtop>
     <div className={styles.conatiner}>留言录</div>
     <Footer></Footer>
   </>
  )
}
