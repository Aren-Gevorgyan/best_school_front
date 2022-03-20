import React, { useState } from "react";
import CommonLayout from "../../common/commonLayout";
import PropTypes from "prop-types";
import styles from "./styles.module.scss";
import { useRouter } from "next/router";
import { Image } from "antd";
import cn from "classnames";

const Questions = ({ questions }) => {
  const router = useRouter();
  const [clickAnswer, setClickAnswer] = useState();
  const [answersIndex, setAnswerIndex] = useState();
  const questionNumber = +router.query.question - 1;
  const question = questions[questionNumber];

  return (
    <CommonLayout>
      <div className={styles.container}>
        <h2>ԱՅՍ ԹԵՄԱՅՈՎ ՔՆՆԱԿԱՆ ՀԱՐՑԵՐԸ</h2>
        <div className={styles.content}>
          <h2>
            {questionNumber + 1}) {question.title}
          </h2>
          <div className={styles.containerImage}>
            <Image layout="fill" src={question.image} alt="BestSchool image" />
          </div>
          <div className={styles.containerAnswers}>
            {question.answers.map((value, index) => {
              console.log(index, question.rightAnswer);
              return (
                <div
                  onClick={() => {
                    setClickAnswer(true);
                    setAnswerIndex(index);
                  }}
                  key={value._id + index}
                  className={cn(
                    styles.answers,
                    answersIndex === index &&
                      answersIndex !== question.rightAnswer &&
                      styles.falseAnswer,
                    clickAnswer &&
                      index === question.rightAnswer &&
                      styles.right,
                    clickAnswer && styles.disabled
                  )}
                >
                  {value}
                </div>
              );
            })}
          </div>
          <div className={styles.containerButton}>
            <button
              onClick={() => {
                setClickAnswer(false);
              }}
            >
              Հաջորդը
            </button>
            <button
              onClick={() => {
                setClickAnswer(false);
              }}
            >
              Նախորդը
            </button>
          </div>
        </div>
      </div>
    </CommonLayout>
  );
};

Questions.propTypes = {
  questions: PropTypes.array,
};

Questions.defaultProps = {
  questions: [],
};

export default Questions;
