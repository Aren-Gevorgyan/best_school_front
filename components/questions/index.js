import React from "react";
import CommonLayout from "../../common/commonLayout";
import PropTypes from "prop-types";
import styles from "./styles.module.scss";
import { useRouter } from "next/router";

const Questions = ({ questions }) => {
  const router = useRouter();
  const questionNumber = +router.query.question - 1;

  return (
    <CommonLayout>
      <div>{questions[questionNumber].title}</div>
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
