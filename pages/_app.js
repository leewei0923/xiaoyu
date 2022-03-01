import "../styles/globals.css";
import { Provider } from "react-redux";
import { useStore } from "../src/store/store";
import "antd/dist/antd.css";

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
