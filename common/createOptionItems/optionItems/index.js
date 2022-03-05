import { Image } from "antd";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import PropTypes from "prop-types";
import { clientApi } from "../../../api/client";

const OptionItems = ({ itemsData, setItemsData, setIsModalVisible }) => {
  const [items, setItems] = useState();

  const deleteOption = async (id) => {
    const optionUrl = `${clientApi}option-items/${id}`;

    const option = await fetch(optionUrl, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8", // Indicates the content
      },
    }).then((res) => res.json());
    
    const newOption = itemsData.filter(val => val._id !== option._id);
    setItemsData(newOption);
  };

  const editOption = async (id) => {
    const optionUrl = `${clientApi}option-items/${id}`;

    const option = await fetch(optionUrl, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8", // Indicates the content
      },
    }).then((res) => res.json());
    
    const newOption = itemsData.filter(val => val._id !== option._id);
    setItemsData(newOption);
  };

  useEffect(() => {
    const items = itemsData?.map((value, index) => {
      return (
        <div key={value._id + index} className={styles.containerItems}>
          <h2>{value.title}</h2>
          <div className={styles.settings}>
            <i
              className="fa fa-trash-o"
              title="Delete"
              onClick={() => {
                deleteOption(value._id);
              }}
            ></i>
            <i className="far fa-edit" title="Edit" onClick={() => {
              setIsModalVisible(true)
              }}></i>
          </div>
          <div className={styles.imageContainer}>
            <Image
              src={value.image || "/images/defaultOption.jpg"}
              alt="Best school option image"
            />
          </div>
        </div>
      )
    });

    setItems(items);
  }, [itemsData]);

  return <div className={styles.container}>{items}</div>;
};

OptionItems.propTypes = {
  itemsData: PropTypes.array.isRequired,
  setItems: PropTypes.func.isRequired,
  setIsModalVisible: PropTypes.func.isRequired,
};

export default OptionItems;
