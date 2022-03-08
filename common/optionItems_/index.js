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
  const [optionItems, setOptionItems] = useState(options);
  const [editOptionItem, setEditOptionItem] = useState(false);
  const [editItemIndex, setEditItemIndex] = useState(0);
  const [items, setItems] = useState(itemsData);
  const [form] = Form.useForm();

  const onClick = () => {
    setIsModalVisible(true);
  };

  useEffect(() => {
    const currentData = items[editItemIndex];
    form.setFieldsValue({
      title: currentData.title,
      chooseOption: currentData.optionId,
    });
    setImg(currentData.image);
  }, [editOptionItem]);

  useEffect(() => {
    setItems(itemsData);
  }, [itemsData]);

  useEffect(() => {
    if (!isModalVisible) {
      form.resetFields();
      setImg("");
    }
  }, [isModalVisible]);

  const saveData = async (e) => {
    if (loadingImg) return;

    const data = {
      title: e.title,
      image: img,
      optionId: e.chooseOption,
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

  const optionItemEdit = async (e, id) => {
    const optionItemUrl = `${clientApi}option-items/${id}`;

    const data = {
      title: e.title,
      optionId: e.chooseOption,
      image: img,
    };

    const optionItem = await fetch(optionItemUrl, {
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8", // Indicates the content
      },
      body: JSON.stringify(data),
    }).then((res) => res.json());

    const newOptionItem = items.map((val, i) => {
      return val._id === optionItem._id ? optionItem : val;
    });

    setIsModalVisible(false);
    setEditOptionItem(false);
    setItems(newOptionItem);
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
        <h2>Create Option Item</h2>

        <div className={styles.containerItems}>
          <CreateItem onClick={onClick} />
          <OptionItems
            itemsData={items}
            setItemsData={setItems}
            setIsModalVisible={setIsModalVisible}
            setEditOptionItem={setEditOptionItem}
            setEditItemIndex={setEditItemIndex}
          />
        </div>

        <Modal
          footer={null}
          title={
            <h2 className={styles.title}>
              {editOptionItem ? "Edit" : "Create"} option item
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
            setEditOptionItem(false);
          }}
        >
          <div className={styles.contentModal}>
            <Form
              form={form}
              onFinish={(e) => {
                if (editOptionItem) {
                  optionItemEdit(e, items[editItemIndex]._id);
                } else {
                  saveData(e);
                }
              }}
            >
              <h3>Option item title</h3>
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
                  placeholder="Title"
                  maxLength={200}
                />
              </Form.Item>
              <h3>Choose Question</h3>
              <Form.Item name="chooseOption">
                <Select
                  className={styles.questionItem}
                  showSearch
                  placeholder="Select a person"
                  optionFilterProp="children"
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
                image={img}
                setImg={setImg}
                onLoad={(e) => {
                  setImg(e);
                }}
              />
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

CreateOptionItems.propTypes = {
  items: PropTypes.array,
  options: PropTypes.array,
};

CreateOptionItems.defaultProps = {
  items: [],
  options: [],
};

export default CreateOptionItems;
