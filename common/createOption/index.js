import styles from "./styles.module.scss";
import PropTypes from "prop-types";
import CreateItem from "../createItem";
import { useEffect, useState } from "react";
import { Form, Modal } from "antd";
import Upload from "../upload";
import SvgClose from "../svgIcons/Close";
import TextArea from "antd/lib/input/TextArea";
import { clientApi } from "../../api/client";

const CreateOption = ({ options }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [img, setImg] = useState("");
  const [form] = Form.useForm();

  const onClick = () => {
    setIsModalVisible(true);
  };

  useEffect(() => {
    !isModalVisible && form.resetFields();
  }, [isModalVisible]);

  const saveData = async (e) => {
    const data = {
      title: e.optionTitle,
      item: {
        itemTitle: e.itemTitle,
        image: img,
      },
    };

    const optionUrl = `${clientApi}option/create`;

    const options = await fetch(optionUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    }).then((res) => res.json());

    console.log(options, "options");
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
            form={form}
            onFinish={(e) => {
              saveData(e);
            }}
          >
            <h3>Option title</h3>
            <Form.Item
              name="optionTitle"
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: "This filed is required",
                },
              ]}
            >
              <TextArea
                className={styles.textArea}
                rows={4}
                placeholder="option title"
                maxLength={200}
              />
            </Form.Item>

            <h3>Item title</h3>
            <Form.Item
              name="itemTitle"
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: "This filed is required",
                },
              ]}
            >
              <TextArea
                className={styles.textArea}
                rows={4}
                placeholder="item title"
                maxLength={200}
              />
            </Form.Item>

            <h3>Item image</h3>
            <Upload
              onLoad={(e) => {
                setImg(e);
              }}
            />
            <div className={styles.buttonsContainer}>
              <button
                className={styles.cancelButton}
                onClick={() => {
                  setIsModalVisible(false);
                }}
              >
                Cancel
              </button>

              <button className={styles.saveButton} type="submit">
                Save
              </button>
            </div>
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
