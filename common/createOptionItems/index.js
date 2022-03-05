/* eslint-disable react/no-unknown-property */
/* eslint-disable @next/next/no-sync-scripts */
import styles from "./styles.module.scss";
import PropTypes from "prop-types";
import CreateItem from "../createItem";
import { useEffect, useState } from "react";
import { Form, Modal, Select } from "antd";
import SvgClose from "../svgIcons/Close";
import TextArea from "antd/lib/input/TextArea";
import { clientApi } from "../../api/client";
import UploadImage from "../upload";
import Head from "next/head";
import OptionItems from "./optionItems";

const { Option } = Select;

const CreateOptionItems = ({ itemsData, options }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [img, setImg] = useState("");
  const [loadingImg, setLoadingImg] = useState(false);
  const [optionId, setOptionId] = useState("");
  const [optionItems, setOptionItems] = useState([]);
  const [items, setItems] = useState(itemsData);
  const [form] = Form.useForm();

  const onClick = () => {
    setIsModalVisible(true);
  };

  useEffect(() => {
    setItems(itemsData);
  }, [itemsData]);

  useEffect(() => {
    !isModalVisible && form.resetFields();
    setImg("");
  }, [isModalVisible]);

  const saveData = async (e) => {
    if (loadingImg) return;

    const data = {
      title: e.optionTitle,
      image: img,
      optionId
    };

    const optionUrl = `${clientApi}option-items/create`;

    setLoadingImg(true);

    const item = await fetch(optionUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => res.json());

    setLoadingImg(false);
    setIsModalVisible(false);

    setItems([...items, item]);
  };

  useEffect(() => {
    const optionsData = options?.map((value, index) => {
      return (
        <Option key={value._id + index} value={value._id}>
          {value.title}
        </Option>
      );
    });
    setOptionItems(optionsData);
  }, [options]);

  const onChange = (value) => {
    setOptionId(value);
  }
  console.log(items, 'items')
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
        <h2>Create Option Item</h2>

        <div className={styles.containerItems}>
          <CreateItem onClick={onClick} />
          <OptionItems
            itemsData={items}
            setItemsData={setItems}
            setIsModalVisible={setIsModalVisible}
          />
        </div>

        <Modal
          footer={null}
          title={<h2 className={styles.title}>Create option item</h2>}
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
              <h3>Option item title</h3>
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
              <h3>Choose Question</h3>
              <Form.Item name="chooseQuestion">
                <Select
                  className={styles.questionItem}
                  showSearch
                  placeholder="Select a person"
                  optionFilterProp="children"
                  onChange={onChange}
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {optionItems}
                </Select>
              </Form.Item>
              <h3>Option Item photo</h3>
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

CreateOptionItems.propTypes = {
  items: PropTypes.array,
  options: PropTypes.array,
};

CreateOptionItems.defaultProps = {
  items: [],
  options: [],
};

export default CreateOptionItems;
