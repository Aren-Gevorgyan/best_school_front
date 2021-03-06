/* eslint-disable react/no-unknown-property */
/* eslint-disable @next/next/no-sync-scripts */
import styles from "./styles.module.scss";
import PropTypes from "prop-types";
import CreateItem from "../createItem";
import { useEffect, useState } from "react";
import { Form, Modal } from "antd";
import SvgClose from "../../svgIcons/Close";
import TextArea from "antd/lib/input/TextArea";
import { clientApi } from "../../../api/client";
import Option from "./option";
import Head from "next/head";

const CreateOption = ({ optionsItems, setOptionsItems }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [optionEdit, setOptionEdit] = useState(false);
  const [editItemIndex, setEditItemIndex] = useState(0);
  const [form] = Form.useForm();

  const onClick = () => {
    setIsModalVisible(true);
  };

  useEffect(() => {
    if (isModalVisible && optionEdit) {
      const currentData = optionsItems[editItemIndex];
      form.setFieldsValue({
        title: currentData?.title,
      });
    } else {
      form.resetFields();
    }
  }, [isModalVisible]);

  const saveData = async (e) => {
    const data = {
      title: e?.title,
    };

    const optionUrl = `${clientApi}option/create`;

    const option = await fetch(optionUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => res.json());

    setIsModalVisible(false);

    setOptionsItems([...optionsItems, option]);
  };

  const editOption = async (e, id) => {
    const optionUrl = `${clientApi}option/${id}`;

    const data = {
      title: e?.title,
    };

    const option = await fetch(optionUrl, {
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8", // Indicates the content
      },
      body: JSON.stringify(data),
    }).then((res) => res.json());

    const newOption = optionsItems.map((val, i) => {
      return val._id === option._id ? option : val;
    });

    setIsModalVisible(false);
    setOptionsItems(newOption);
    setOptionEdit(false);
  };

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"
          integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf"
          crossorigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
      </Head>
      <div className={styles.container}>
        <h2>Create Option ({optionsItems.length})</h2>

        <div className={styles.containerItems}>
          <CreateItem onClick={onClick} />
          <Option
            options={optionsItems}
            setOptionsItems={setOptionsItems}
            setIsModalVisible={setIsModalVisible}
            setOptionEdit={setOptionEdit}
            setEditItemIndex={setEditItemIndex}
          />
        </div>

        <Modal
          footer={null}
          title={
            <h2 className={styles.title}>
              {optionEdit ? "Edit option" : "Create option"}
            </h2>
          }
          className={styles.modal}
          visible={isModalVisible}
          closeIcon={
            <span className={styles.close}>
              <SvgClose height="24px" width="24px" />
            </span>
          }
          onCancel={() => {
            setIsModalVisible(false);
            setOptionEdit(false);
          }}
        >
          <div className={styles.contentModal}>
            <Form
              form={form}
              onFinish={(e) => {
                if (optionEdit) {
                  editOption(e, optionsItems[editItemIndex]._id);
                } else {
                  saveData(e);
                }
              }}
            >
              <h3>Option title</h3>
              <Form.Item
                name="title"
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
                  maxLength={400}
                />
              </Form.Item>
              <div className={styles.buttonsContainer}>
                <button
                  className={styles.cancelButton}
                  onClick={() => {
                    setIsModalVisible(false);
                    setEditQuestion(false);
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
    </>
  );
};

CreateOption.propTypes = {
  optionsItems: PropTypes.array,
  setOptionsItems: PropTypes.func.isRequired,
};

CreateOption.defaultProps = {
  optionsItems: [],
};

export default CreateOption;
