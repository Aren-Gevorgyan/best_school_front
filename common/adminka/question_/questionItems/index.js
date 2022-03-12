import { Image } from "antd";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import PropTypes from "prop-types";
import { clientApi } from "../../../../api/client";

const QuestionItems = ({
  questionData,
  setQuestionData,
  setIsModalVisible,
  setEditQuestion,
  setEditQuestionIndex,
}) => {
  const [question, setQuestion] = useState();

  const deleteQuestion = async (id) => {
    const questionUrl = `${clientApi}question/${id}`;

    const question = await fetch(questionUrl, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8", // Indicates the content
      },
    }).then((res) => res.json());

    const newQuestion = questionData.filter((val) => val._id !== question._id);
    setQuestionData(newQuestion);
  };

  useEffect(() => {
    const items = questionData?.map((value, index) => {
      return (
        <div key={value._id + index} className={styles.containerItems}>
          <h2>{value.title}</h2>
          {!!value?.answers?.length ? (
            <p>Answers: {value?.answers?.length}</p>
          ) : (
            <p>Answers: &#128530;</p>
          )}
          <div className={styles.settings}>
            <i
              className="fa fa-trash-o"
              title="Delete"
              onClick={() => {
                deleteQuestion(value._id);
              }}
            ></i>
            <i
              className="far fa-edit"
              title="Edit"
              onClick={() => {
                setIsModalVisible(true);
                setEditQuestion(true)
                setEditQuestionIndex(index);
              }}
            ></i>
          </div>
          <div className={styles.imageContainer}>
            <Image
              src={value.image || "/images/defaultOption.jpg"}
              alt="Best school option image"
            />
          </div>
        </div>
      );
    });

    setQuestion(items);
  }, [questionData]);

  return <div className={styles.container}>{question}</div>;
};

QuestionItems.propTypes = {
  itemsData: PropTypes.array,
  setItems: PropTypes.func,
  setIsModalVisible: PropTypes.func.isRequired,
  setEditQuestionIndex: PropTypes.func.isRequired,
  setEditQuestion: PropTypes.func.isRequired,
};

QuestionItems.defaultProps = {
  setItems: () => {},
  itemsData: [],
}

export default QuestionItems;
