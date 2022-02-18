import Headers from "../Header/Header";
import NavTop from "../NavigationTop/NavTop"
import Mains from "../Main/Main";
import Footer from "../Footer/Footer"
export default function Layout({children}) {

  return (
    <div>
      <Headers></Headers>
      {/* topBar */}
      <NavTop></NavTop>
      {/* <Mains></Mains> */}
      {children}
      <Footer></Footer>
    </div>
  );
}
