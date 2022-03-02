/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from "react";

import { PlusOutlined } from "@ant-design/icons";
import { Tag, Input } from "antd";
import PropTypes from "prop-types";

import styles from "./styles.module.scss";

const SelectQuestions = ({
  selectedQuestions,
  setSelectedQuestions,
  rightAnswer,
  setRightAnswer,
}) => {
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleClose = (removedQuestions) => {
    const currentQuestions = selectedQuestions.filter(
      (questions) => questions !== removedQuestions
    );
    setSelectedQuestions(currentQuestions);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = (e) => {
    const { value } = e.target;
    if(!value.trim().length) return;
    
    const valueExist = value.trim().length !== 1;
    if (valueExist && selectedQuestions.indexOf(value) === -1) {
      selectedQuestions = [...selectedQuestions, value];
    }
    setSelectedQuestions(selectedQuestions);
    setInputVisible(false);
    setInputValue("");
  };

  const forMap = (questions, index) => {
    const questionsElem = (
      <Tag
        closable
        onClose={(e) => {
          e.preventDefault();
          handleClose(questions);
        }}
      >
        {questions}
      </Tag>
    );

    return (
      <div key={questions} className={styles.questionsItem}>
        {questionsElem}
        <input
          className={styles.rightAnswer}
          type={"radio"}
          checked={+rightAnswer === index}
          name={"name"}
          value={index}
          onClick={(e) => {
            setRightAnswer(e.target.value);
            console.log(e.target.value, "eee");
          }}
        />
      </div>
    );
  };

  const questionsChild = selectedQuestions.map(forMap);

  return (
    <div className={styles.containerSelectedQuestions}>
      <div>{questionsChild}</div>
      {inputVisible && (
        <Input
          type="text"
          size="small"
          autoFocus
          style={{ width: 78 }}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      )}
      {!inputVisible && (
        <Tag onClick={() => setInputVisible(true)} className="site-tag-plus">
          <PlusOutlined /> Add questions
        </Tag>
      )}
    </div>
  );
};

SelectQuestions.propTypes = {
  selectedQuestions: PropTypes.array.isRequired,
  setSelectedQuestions: PropTypes.func.isRequired,
  rightAnswer: PropTypes.number.isRequired,
  setRightAnswer: PropTypes.func.isRequired,
};

export default SelectQuestions;
