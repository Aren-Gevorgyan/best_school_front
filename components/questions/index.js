import React, { useEffect, useState } from "react";
import CommonLayout from "../../common/commonLayout";
import PropTypes from "prop-types";
import styles from "./styles.module.scss";
import Router, { useRouter } from "next/router";
import { Image } from "antd";
import cn from "classnames";
import QuestionModal from "./questionModal";

const Questions = ({ questions }) => {
  const router = useRouter();
  const [clickAnswer, setClickAnswer] = useState();
  const [answersIndex, setAnswerIndex] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(0);
  const [rightAnswerCount, setRightAnswerCount] = useState(0);
  const questionNumber = Number(router.query.question);
  const question = questions[questionNumber - 1];
  const questionIsDone = questionNumber === questions.length;
  const disabledNextButton = !clickAnswer;

  const nextQuestion = () => {
    if (questionIsDone) return setIsModalVisible(true);
    setClickAnswer(false);
    setAnswerIndex(false);
    Router.push(
      `/question/622c6506230743b4c5d9428e?question=${questionNumber + 1}`,
      undefined,
      { scroll: true, shallow: true }
    );
  };

  const prevQuestion = () => {
    setClickAnswer(false);
    setAnswerIndex(false);
    Router.push(
      `/question/622c6506230743b4c5d9428e?question=${questionNumber - 1}`,
      undefined,
      { scroll: true, shallow: true }
    );
  };

  const clickAnswerFun = (index) => {
    setClickAnswer(true);
    setAnswerIndex(index);
    const rightAnswer = question?.rightAnswer === index;
    if (rightAnswer) {
      setRightAnswerCount(rightAnswerCount + 1);
    }
  };

  const disabledPrevButton = questionNumber === 1;

  return (
    <CommonLayout>
      <>
        <div className={styles.container}>
          <h2>ԱՅՍ ԹԵՄԱՅՈՎ ՔՆՆԱԿԱՆ ՀԱՐՑԵՐԸ ({question.length})</h2>
          <div className={styles.content}>
            <h2>
              {questionNumber}) {question?.title}
            </h2>
            {question.image && <div className={styles.containerImage}>
              <Image
                layout="fill"
                src={question.image}
                alt="BestSchool image"
              />
            </div>}
            <div className={styles.containerAnswers}>
              {question.answers.map((value, index) => {
                return (
                  <div
                    onClick={() => {
                      clickAnswerFun(index);
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
                onClick={prevQuestion}
                className={disabledPrevButton && styles.disabled}
              >
                Նախորդը
              </button>
              <button
                onClick={nextQuestion}
                className={disabledNextButton && styles.disabled}
              >
                Հաջորդը
              </button>
            </div>
          </div>
        </div>
        <QuestionModal
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          rightAnswerCount={rightAnswerCount}
          questions={questions}
          setClickAnswer={setClickAnswer}
          setAnswerIndex={setAnswerIndex}
        />
      </>
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
