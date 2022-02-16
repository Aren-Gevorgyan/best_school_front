import PropTypes from "prop-types";
import "antd/dist/antd.css";
import { Layout, Menu } from "antd";
import { DesktopOutlined, PieChartOutlined } from "@ant-design/icons";
import { useState } from "react";
import Router, { useRouter } from "next/router";

const { Header, Content, Footer, Sider } = Layout;

const LayoutAdminka = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const pathname = router.pathname === "/adminka" ? "adminka" : "/";

  const selectMenu = (e) => {
    let path = `${e.key}`;
    Router.push(path, undefined, { shallow: false });
  };

  const selectTabMenu = (e) => {
    let path = `/adminka?tab=${e.key}`;
    Router.push(path, undefined, { shallow: false });
  };

  const onCollapse = (e) => {
    setCollapsed(e);
  };

  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <Menu
            onSelect={selectTabMenu}
            theme="dark"
            defaultSelectedKeys={[router.query.tab]}
            mode="inline"
          >
            <Menu.Item key="options" icon={<PieChartOutlined />}>
              Options
            </Menu.Item>
            <Menu.Item key="questions" icon={<DesktopOutlined />}>
              Questions
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="header">
            <Menu
              onSelect={selectMenu}
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={[pathname]}
            >
              <Menu.Item key="/">Home</Menu.Item>
              <Menu.Item key="adminka">Adminka</Menu.Item>
            </Menu>
          </Header>
          <Content style={{ margin: "0 16px" }}>{children}</Content>
          <Footer style={{ textAlign: "center" }}>BestSchool ©2022</Footer>
        </Layout>
      </Layout>
    </>
  );
};

LayoutAdminka.propTypes = {
  children: PropTypes.object,
};

export default LayoutAdminka;
