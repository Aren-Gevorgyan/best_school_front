/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from "react";

import { PlusOutlined } from "@ant-design/icons";
import { Tag, Input } from "antd";
import PropTypes from "prop-types";

import styles from "./styles.module.scss";

const SelectAnswers = ({
  selectedAnswers,
  setSelectedAnswers,
  rightAnswer,
  setRightAnswer,
}) => {
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleClose = (removedQuestions) => {
    const currentQuestions = selectedAnswers.filter(
      (questions) => questions !== removedQuestions
    );
    setSelectedAnswers(currentQuestions);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = (e) => {
    const { value } = e.target;
    if(!value.trim().length) return;
    
    const valueExist = value.trim().length !== 1;
    if (valueExist && selectedAnswers.indexOf(value) === -1) {
      selectedAnswers = [...selectedAnswers, value];
    }
    setSelectedAnswers(selectedAnswers);
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
          }}
        />
      </div>
    );
  };

  const questionsChild = selectedAnswers.map(forMap);

  return (
    <div className={styles.containerselectedAnswers}>
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

SelectAnswers.propTypes = {
  selectedAnswers: PropTypes.array.isRequired,
  setSelectedAnswers: PropTypes.func.isRequired,
  rightAnswer: PropTypes.number.isRequired,
  setRightAnswer: PropTypes.func.isRequired,
};

export default SelectAnswers;
