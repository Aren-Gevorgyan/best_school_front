import PropTypes from "prop-types";
import "antd/dist/antd.css";
import { Layout, Menu } from "antd";
import Router, { useRouter } from "next/router";
import styles from "./styles.module.scss";
import Link from "next/link";
import cn from "classnames";

const { Header, Content, Footer, Sider } = Layout;

const CommonLayout = ({ children }) => {
  const router = useRouter();
  const asPath = router.asPath === "/adminka" ? "adminka" : "/";

  // const selectMenu = (e) => {
  //   const path = `${e.key}`;
  //   router.push(path, undefined, { shallow: false });
  // };

  return (
    <Layout className="site-layout">
      <Header className={(cn("header"), styles.header)}>
        <Menu
          // onSelect={selectMenu}
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[asPath]}
        >
          <Link href={"http://localhost:3000"}>
            <a className={cn(styles.router, asPath === "/" && styles.active)}>
              <Menu.Item>Home</Menu.Item>
            </a>
          </Link>
          <Link href={"http://localhost:3000/adminka"}>
            <a
              className={cn(
                styles.router,
                asPath === "adminka" && styles.active
              )}
            >
              <Menu.Item>Adminka</Menu.Item>
            </a>
          </Link>
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
