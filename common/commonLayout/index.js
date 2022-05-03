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

  return (
    <Layout className="site-layout">
      <Header className={(cn("header"), styles.header)}>
        <Menu
          // onSelect={selectMenu}
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[asPath]}
        >
          <Link href={"https://best-start-school.herokuapp.com/"}>
            <a className={cn(styles.router, asPath === "/" && styles.active)}>
              <Menu.Item>ԳԼԽԱՎՈՐ</Menu.Item>
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
