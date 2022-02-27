import { Image } from "antd";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";

const OptionItems = ({ options }) => {
  const [items, setItems] = useState();

  useEffect(() => {
    const items = options.map((value, index) => {
      return (
        <div key={value._id + index} className={styles.containerItems}>
          <h2>{value.title}</h2>
          <h4>{value.subTitle}</h4>
          <div className={styles.imageContainer}>
            <Image src={value.image} alt="Best school option image" />
          </div>
        </div>
      );
    });
  }, [options]);

  return <div className={container}>{optionsItems}</div> ;
};
