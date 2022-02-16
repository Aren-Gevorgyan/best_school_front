import styles from "./styles.module.scss";
import PropTypes from "prop-types";
import CreateItem from "../createItem";
import { useState } from "react";
import { Modal } from "antd";
import SvgClose from "../svgIcons/Close";

const CreateOption = ({ options }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const onClick = () => {
    setIsModalVisible(true);
  };

  return (
    <div className={styles.container}>
      <h2>Create option</h2>
      <CreateItem onClick={onClick} />
      <Modal
        footer={null}
        title={<h2 className={styles.title}>Create option</h2>}
        className={styles.modal}
        visible={isModalVisible}
        closeIcon={
          <span className={styles.close}>
            <SvgClose height="24px" width="24px" />
          </span>
        }
        onCancel={() => {
          setIsModalVisible(false);
        }}
      >
        <div className={styles.contentModal}></div>
      </Modal>
    </div>
  );
};

CreateOption.propTypes = {
  options: PropTypes.array,
};

CreateOption.defaultProps = {
  options: [],
};

export default CreateOption;
