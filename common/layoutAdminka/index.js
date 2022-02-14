import PropTypes from "prop-types";
import "antd/dist/antd.css";
import { Layout, Menu } from "antd";
import { DesktopOutlined, PieChartOutlined } from "@ant-design/icons";
import { useState } from "react";

const { Header, Content, Footer, Sider } = Layout;

const LayoutAdminka = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = (e) => {
    setCollapsed(e);
  };

  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
            <Menu.Item key="1" icon={<PieChartOutlined />}>
              Option
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />}>
              Question
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="header">
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
              <Menu.Item key="1">Home</Menu.Item>
              <Menu.Item key="2">Adminka</Menu.Item>
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
