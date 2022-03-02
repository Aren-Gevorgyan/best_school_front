import { Image } from "antd";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import PropTypes from "prop-types";
import SvgEdit from "../../svgIcons";
import SvgDelete from "../../svgIcons";
import { clientApi } from "../../../api/client";

const OptionItems = ({ options, setOptionsItems }) => {
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

  useEffect(() => {
    const items = options?.map((value, index) => {
      return (
        <div key={value._id + index} className={styles.containerItems}>
          <h2>{value.title}</h2>
          <h4>{value.item[0].itemTitle}</h4>
          <div className={styles.settings}>
            <i
              className="fa fa-trash-o"
              title="Delete"
              onClick={() => {
                console.log(555), deleteOption(value._id);
              }}
            ></i>
            <i className="far fa-edit" title="Edit" onClick={() => {}}></i>
          </div>
          <div className={styles.imageContainer}>
            <Image
              src={value.item[0].image || "/images/defaultOption.jpg"}
              alt="Best school option image"
            />
          </div>
        </div>
      );
    });

    setItems(items);
  }, [options]);

  return <div className={styles.container}>{optionsItems}</div>;
};

OptionItems.propTypes = {
  options: PropTypes.array.isRequired,
  setOptionsItems: PropTypes.func.isRequired
};

export default OptionItems;
