import { Provider } from "react-redux";
import { useStore } from "../src/store/store";
import Head from "next/head";
import ico from "../public/favicon.ico";
import "antd/dist/antd.css";
import "../styles/globals.css";
import "~/styles/admin/bytemd.min.css";
import "@ant-design/flowchart/dist/index.css";

function MyApp({ Component, pageProps }) {
  const store = useStore();
  return (
    <>
      <Head>
        <title>七秒鱼</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="七秒鱼，前端开发者自己的博客网站。做自己想做的东西。"
        />
        <meta name="author" content="leewei|李伟" />
        {/* <!-- sns 社交标签 begin --> */}
        {/* <!-- 参考微博API --> */}
        <meta property="og:type" content="blog" />
        <meta property="og:url" content="https://doc.icenew.top" />
        <meta property="og:title" content="七秒鱼" />
        <meta
          property="og:description"
          content="七秒鱼，前端开发者自己的博客网站。做自己想做的东西。"
        />
        <link rel="icon" type="image/ico" sizes="32x32" href={ico.src} />
        {/* <!-- sns 社交标签 end --> */}
      </Head>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}

export default MyApp;
