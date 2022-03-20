import CommonLayout from "../../common/commonLayout";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { Image } from "antd";
import Router from "next/router";

const Home = ({ options }) => {
  const [optionsItem, setOptionsItem] = useState([]);

  const openQuestion = (id) => {
    Router.push(`/question/${id}?question=1`, undefined, {
      shallow: false,
      scroll: true,
    });
  };

  useEffect(() => {
    const items = options.map((val, index) => {
      return (
        <div key={val._id + index} className={styles.optionsContainer}>
          <h3>
            {val?.title} ({val.items.length})
          </h3>
          <div>
            {val.items.map((items, index) => {
              return (
                <>
                  {val.items.length > 1 && <span></span>}
                  <div
                    onClick={() => {
                      openQuestion(items._id);
                    }}
                    key={items._id + index}
                    className={styles.itemsContainer}
                  >
                    {!!items.image && (
                      <Image
                        layout="fixed"
                        width={80}
                        height={80}
                        src={items.image}
                        alt="Best image"
                      />
                    )}
                    <p>{items.title}</p>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      );
    });

    setOptionsItem(items);
  }, [options]);

  return (
    <CommonLayout>
      <div className={styles.container}>{optionsItem}</div>
    </CommonLayout>
  );
};

Home.protoTypes = {
  options: PropTypes.array.isRequired,
};

export default Home;
