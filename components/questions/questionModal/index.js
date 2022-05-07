import { Image, Modal } from "antd";
import React, { useEffect, useState } from "react";
import SvgClose from "../../../common/svgIcons/Close";
import PropTypes from "prop-types";
import styles from "./styles.module.scss";
import Router from "next/router";

const QuestionModal = ({
  isModalVisible,
  setIsModalVisible,
  rightAnswerCount,
  questions,
  setClickAnswer,
  setAnswerIndex,
}) => {
  const [percent, setPercent] = useState();
  const [answerText, setAnswerText] = useState();

  useEffect(() => {
    const percent = Math.round((rightAnswerCount * 100) / questions.length);
    if (percent >= 90) {
      setAnswerText("Գերազանց է։");
    } else if (percent >= 50) {
      setAnswerText("Վատ չի, բայց բավարար էլ չի։");
    } else {
      setAnswerText("Բավարար չէ, կրկին փորձիր։");
    }
    setPercent(percent);
  }, [isModalVisible]);

  const againQuestion = () => {
    setIsModalVisible(false);
    setClickAnswer(false);
    setAnswerIndex(false);
    Router.push(`/question/622c6506230743b4c5d9428e?question=1`, undefined, {
      scroll: true,
      shallow: true,
    });
  };

  const redirectOptionPage = () => {
    setIsModalVisible(false);
    setClickAnswer(false);
    setAnswerIndex(false);
    Router.push(`/`, undefined, {
      scroll: true,
      shallow: true,
    });
  };

  return (
    <Modal
      footer={null}
      className={styles.modal}
      visible={isModalVisible}
      closeIcon={
        <span className={styles.close}>
          <SvgClose height="24px" width="24px" />
        </span>
      }
      onCancel={() => {
        setIsModalVisible(false);
      }}
    >
      <h2>
        ԱՐԴՅՈՒՆՔԸ <span>{percent}%</span>
      </h2>
      <p>{answerText}</p>
      <Image
        layout="fixed"
        width={250}
        height={300}
        src="https://firebasestorage.googleapis.com/v0/b/bestschool-16484.appspot.com/o/images%2FIMG_4621%20copy.png?alt=media"
        alt="Best School policeman"
      />
      <div className={styles.buttonContainer}>
        <button onClick={againQuestion}>Կրկին փորձել</button>
        <button onClick={redirectOptionPage}>Վերադառնալ հարցաշար</button>
      </div>
    </Modal>
  );
};

QuestionModal.propTypes = {
  isModalVisible: PropTypes.bool,
  setIsModalVisible: PropTypes.func.isRequired,
  rightAnswerCount: PropTypes.number,
  questions: PropTypes.array,
  setClickAnswer: PropTypes.func.isRequired,
  setAnswerIndex: PropTypes.func.isRequired,
};

QuestionModal.defaultProps = {
  isModalVisible: false,
  rightAnswerCount: 0,
  questions: [],
};

export default QuestionModal;
