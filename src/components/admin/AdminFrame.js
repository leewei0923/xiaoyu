import Navigationtop from "~/src/components/NavigationTop/NavTop";
import Footer from "~/src/components/Footer/Footer";
import { Layout, Menu, Breadcrumb, Button } from "antd";
import {
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  FormOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { changeTheKey, changeSubKey } from "~/src/store/action";
import styles from "./adminFrame.module.scss";

export default function AdminFrame(props) {
  const { children } = props;
  const dispatch = useDispatch();

  const { Content, Sider } = Layout;
  const { SubMenu } = Menu;

  const [collapsed, setCollapsed] = useState(false);
  
  
  const onTrigger = (e) => {
    setCollapsed(!collapsed);
  };

  // 切换页面保持导航栏的现状
  const menuChange = (e) => {
    dispatch(changeTheKey([e.key]));
  };

  const onSubMenu = (e) => {
    dispatch(changeSubKey([...e]));
  }

  const theKey = useSelector((state) => {
    return state.changeTheKey.theKey;
  });

  const subKey = useSelector((state) => {
    return state.changeSubKey.subKey;
  });

 // ----

  return (
    <>
      <Navigationtop></Navigationtop>

      <Layout hasSider className={styles.layout}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <Menu
            theme="dark"
            defaultSelectedKeys={theKey}
            mode="inline"
            onClick={(e) => menuChange(e)}
            onOpenChange={(e) => onSubMenu(e)}
            defaultOpenKeys={subKey}
          >
            <Menu.Item key="triBtn">
              <Button
                onClick={() => onTrigger()}
                icon={<LeftOutlined />}
                className={styles.onCollapsed}
              ></Button>
            </Menu.Item>
            <Menu.Item key="siteData" icon={<PieChartOutlined />}>
              <Link href="/admin/options/siteData">数据一览</Link>
            </Menu.Item>
            <Menu.Item key="editArticles" icon={<FormOutlined />}>
              <Link href="/admin/options/editArticles">写文章</Link>
            </Menu.Item>

            <SubMenu
              key="contentManagement"
              icon={<UserOutlined />}
              title="内容管理"
            >
              <Menu.Item key="myArticles">
                <Link href="/admin/contentManagement/myArticles">我的文章</Link>
              </Menu.Item>

              <Menu.Item key="drafts">
                <Link href="/admin/contentManagement/drafts">草稿箱</Link>
              </Menu.Item>
              <Menu.Item key="gallery">
                <Link href="/admin/contentManagement/gallery">我的图库</Link>
              </Menu.Item>
              <Menu.Item key="tags">
                <Link href="/admin/contentManagement/tags">标签</Link>
              </Menu.Item>
              <Menu.Item key="notions">
                <Link href="/admin/contentManagement/drafts">公告</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<TeamOutlined />} title="游览">
              <Menu.Item key="message">
                <Link href="/admin/others/message">留言板</Link>
              </Menu.Item>
              <Menu.Item key="friendLink">友链</Menu.Item>
            </SubMenu>
            <SubMenu key="sub3" icon={<TeamOutlined />} title="内容">
              <Menu.Item key="projrect">我的作品</Menu.Item>
            </SubMenu>
            <Menu.Item key="account" icon={<FileOutlined />}>
              <Link href="/admin/account">账号管理</Link>
            </Menu.Item>
            <Menu.Item key="aboutMe" icon={<FileOutlined />}>
              关于作者
            </Menu.Item>
          </Menu>

          {/* <Button icon={<LeftOutlined />} onClick={() => onCollapse()}></Button> */}
        </Sider>

        <Layout className="site-layout">
          <Content style={{ margin: "0 16px" }}>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360 }}
            >
              {children}
            </div>
          </Content>
        </Layout>
      </Layout>

      <Footer></Footer>
    </>
  );
}

const Link = ({ children, href }) => {
  const router = useRouter();
  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        router.push(href);
      }}
    >
      {children}
    </a>
  );
};
