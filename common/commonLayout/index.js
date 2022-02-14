import PropTypes from "prop-types";
import "antd/dist/antd.css";
import { Layout, Menu } from "antd";
import Router from "next/router";

const { Header, Content, Footer, Sider } = Layout;

const CommonLayout = ({ children }) => {
  const selectMenu = (e) => {
    const path = `${e.key}`;
    Router.push(path, undefined, { shallow: false });
  };

  return (
    <Layout className="site-layout">
      <Header className="header">
        <Menu
          onSelect={selectMenu}
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
        >
          <Menu.Item key="/">Home</Menu.Item>
          <Menu.Item key="/adminka">Adminka</Menu.Item>
        </Menu>
      </Header>
      <Content style={{ margin: "0 16px" }}>{children}</Content>
      <Footer style={{ textAlign: "center" }}>BestSchool ©2022</Footer>
    </Layout>
  );
};

CommonLayout.prototypes = {
  component: PropTypes.object.isRequired,
};

export default CommonLayout;
