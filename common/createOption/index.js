/* eslint-disable react/no-unknown-property */
/* eslint-disable @next/next/no-sync-scripts */
import styles from "./styles.module.scss";
import PropTypes from "prop-types";
import CreateItem from "../createItem";
import { useEffect, useState } from "react";
import { Form, Modal } from "antd";
import SvgClose from "../svgIcons/Close";
import TextArea from "antd/lib/input/TextArea";
import { clientApi } from "../../api/client";
import UploadImage from "../upload";
import OptionItems from "./optionItems";
import Head from "next/head";

const CreateOption = ({ options }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [img, setImg] = useState("");
  const [loadingImg, setLoadingImg] = useState(false);
  const [optionsItems, setOptionsItems] = useState(options);
  const [form] = Form.useForm();

  const onClick = () => {
    setIsModalVisible(true);
  };

  useEffect(() => {
    setOptionsItems(options);
  }, [options]);

  useEffect(() => {
    !isModalVisible && form.resetFields();
    setImg("")
  }, [isModalVisible]);

  const saveData = async (e) => {
    if (loadingImg) return;

    const data = {
      title: e.optionTitle,
      item: {
        itemTitle: e.itemTitle,
        image: img,
      },
    };

    const optionUrl = `${clientApi}option/create`;

    setLoadingImg(true);

    const option = await fetch(optionUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => res.json());

    setLoadingImg(false);
    setIsModalVisible(false);

    setOptionsItems([...optionsItems, option]);
  };

  console.log(optionsItems, "optionsItems");

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
        <h2>Create option</h2>

        <div className={styles.containerItems}>
          <CreateItem onClick={onClick} />
          <OptionItems options={optionsItems} setOptionsItems={setOptionsItems}/>
        </div>

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

              <h3>Item photo</h3>
              <UploadImage
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
    </>
  );
};

CreateOption.propTypes = {
  options: PropTypes.array,
};

CreateOption.defaultProps = {
  options: [],
};

export default CreateOption;
