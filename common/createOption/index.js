import styles from "./styles.module.scss";
import PropTypes from "prop-types";
import CreateItem from "../createItem";
import { useState } from "react";
import { Form, Modal } from "antd";
import Upload from "../upload";
import SvgClose from "../svgIcons/Close";
import TextArea from "antd/lib/input/TextArea";

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
        <div className={styles.contentModal}>
          <Form
            onFinish={(e) => {
              console.log(e);
            }}
          >
            <h3>Option title</h3>
            <Form.Item name="optionTitle">
              <TextArea
                className={styles.textArea}
                rows={4}
                placeholder="option title"
                maxLength={200}
              />
            </Form.Item>

            <h3>Item title</h3>
            <Form.Item name="optionTitle">
              <TextArea
                className={styles.textArea}
                rows={4}
                placeholder="item title"
                maxLength={200}
              />
            </Form.Item>

            <h3>Item image</h3>
            <Form.Item name="optionTitle">
              <Upload
                onLoad={(e) => {
                  console.log(e, "eeeee");
                }}
              />
            </Form.Item>
          </Form>
        </div>
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
