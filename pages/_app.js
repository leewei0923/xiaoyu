import "../styles/globals.css";
import { Provider } from "react-redux";
import { useStore } from "../src/store/store";
import "antd/dist/antd.css";
import "~/styles/admin/bytemd.min.css";
import "@ant-design/flowchart/dist/index.css";

function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);
  return (
    <>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}

export default MyApp;
