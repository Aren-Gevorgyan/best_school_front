import PropTypes from "prop-types";
import "antd/dist/antd.css";
import { Layout, Menu } from "antd";
import Router, { useRouter } from "next/router";
import styles from "./styles.module.scss";

const { Header, Content, Footer, Sider } = Layout;

const CommonLayout = ({ children }) => {
  const router = useRouter();
  const asPath = router.asPath === "/adminka" ? "adminka" : "/";

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
          defaultSelectedKeys={[asPath]}
        >
          <Menu.Item key="/">Home</Menu.Item>
          <Menu.Item key="adminka">Adminka</Menu.Item>
        </Menu>
      </Header>
      <Content className={styles.content}>{children}</Content>
      <Footer style={{ textAlign: "center" }}>BestSchool ©2022</Footer>
    </Layout>
  );
};

CommonLayout.prototypes = {
  component: PropTypes.object.isRequired,
};

export default CommonLayout;
