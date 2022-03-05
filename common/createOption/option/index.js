import { Image } from "antd";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import PropTypes from "prop-types";
import { clientApi } from "../../../api/client";

const Option = ({ options, setOptionsItems, setIsModalVisible }) => {
  const [optionsItems, setItems] = useState();

  const deleteOption = async (id) => {
    const optionUrl = `${clientApi}option/${id}`;

    const option = await fetch(optionUrl, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8", // Indicates the content
      },
    }).then((res) => res.json());
    
    const newOption = options.filter(val => val._id !== option._id);
    setOptionsItems(newOption);
  };

  const editOption = async (id) => {
    const optionUrl = `${clientApi}option/${id}`;

    const option = await fetch(optionUrl, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8", // Indicates the content
      },
    }).then((res) => res.json());
    
    const newOption = options.filter(val => val._id !== option._id);
    setOptionsItems(newOption);
  };

  useEffect(() => {
    const items = options?.map((value, index) => {
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
        </div>
      )
    });

    setItems(items);
  }, [options]);

  return <div className={styles.container}>{optionsItems}</div>;
};

Option.propTypes = {
  options: PropTypes.array.isRequired,
  setOptionsItems: PropTypes.func.isRequired,
  setIsModalVisible: PropTypes.func.isRequired,
  setEditOptionIndex: PropTypes.func.isRequired,
};

export default Option;
